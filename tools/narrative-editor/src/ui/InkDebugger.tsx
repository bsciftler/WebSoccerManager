import React, { useState, useMemo, useRef } from 'react';
import { Story } from 'inkjs';

interface InkDebuggerProps {
  story?: Story;
  onStoryLoad?: (story: Story) => void;
  onVariableChange?: (variableId: string, value: any) => void;
}

interface KnotInfo {
  name: string;
  type: 'knot' | 'stitch';
  tags: string[];
  content: string;
  children?: KnotInfo[];
}

interface Breakpoint {
  id: string;
  type: 'tag' | 'knot' | 'variable';
  pattern: string;
  enabled: boolean;
}

interface VariableWatch {
  id: string;
  name: string;
  value: any;
  previousValue?: any;
  changed: boolean;
}

export const InkDebugger: React.FC<InkDebuggerProps> = ({
  story,
  onStoryLoad,
  onVariableChange,
}) => {
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([]);
  const [watchedVariables, setWatchedVariables] = useState<VariableWatch[]>([]);
  const [currentKnot, setCurrentKnot] = useState<string>('');
  const [isPaused, setIsPaused] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [choices, setChoices] = useState<{ index: number; text: string }[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const knotTree = useMemo(() => {
    if (!story) return [];
    return extractKnotTree(story);
  }, [story]);

  const storyVariables = useMemo(() => {
    if (!story) return [];
    // Use public API to get variables
    const variables: { id: string; name: string; value: any; changed: boolean }[] = [];
    try {
      // This is a simplified approach - in production, you'd use proper inkjs APIs
      variables.push({ id: 'morale', name: 'morale', value: 0.5, changed: false });
      variables.push({ id: 'week', name: 'week', value: 1, changed: false });
    } catch (error) {
      console.error('Error getting story variables:', error);
    }
    return variables;
  }, [story]);

  const loadStory = async (file: File) => {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const newStory = new Story(json);
      onStoryLoad?.(newStory);
      setOutput([]);
      setChoices([]);
      setCurrentTags([]);
      setCurrentKnot('');
    } catch (error) {
      console.error('Failed to load story:', error);
    }
  };

  const extractKnotTree = (story: Story): KnotInfo[] => {
    const knots: KnotInfo[] = [];
    
    // This is a simplified extraction - in a real implementation,
    // you'd parse the story structure more thoroughly
    if (story.mainContentContainer) {
      // Extract knots from the story structure
      // This is a placeholder implementation
      knots.push({
        name: 'main',
        type: 'knot',
        tags: [],
        content: 'Main story content',
      });
    }
    
    return knots;
  };

  const addBreakpoint = (type: Breakpoint['type'], pattern: string) => {
    const newBreakpoint: Breakpoint = {
      id: `bp_${Date.now()}`,
      type,
      pattern,
      enabled: true,
    };
    setBreakpoints(prev => [...prev, newBreakpoint]);
  };

  const removeBreakpoint = (id: string) => {
    setBreakpoints(prev => prev.filter(bp => bp.id !== id));
  };

  const toggleBreakpoint = (id: string) => {
    setBreakpoints(prev => prev.map(bp => 
      bp.id === id ? { ...bp, enabled: !bp.enabled } : bp
    ));
  };

  const addVariableWatch = (variableId: string) => {
    const variable = storyVariables.find(v => v.id === variableId);
    if (variable && !watchedVariables.find(w => w.id === variableId)) {
      setWatchedVariables(prev => [...prev, { ...variable }]);
    }
  };

  const removeVariableWatch = (variableId: string) => {
    setWatchedVariables(prev => prev.filter(w => w.id !== variableId));
  };

  const continueStory = () => {
    if (!story || isPaused) return;
    
    const newOutput: string[] = [];
    const newTags: string[] = [];
    
    while (story.canContinue && !isPaused) {
      const line = story.Continue()?.trimEnd() || '';
      if (line) newOutput.push(line);
      
      // Check for breakpoints
      const currentTags = story.currentTags || [];
      for (const tag of currentTags) {
        newTags.push(tag);
        
        // Check tag breakpoints
        const tagBreakpoint = breakpoints.find(bp => 
          bp.enabled && bp.type === 'tag' && tag.includes(bp.pattern)
        );
        if (tagBreakpoint) {
          setIsPaused(true);
          break;
        }
      }
      
      // Check knot breakpoints
      const currentKnotName = 'main'; // Simplified - in production, get from story state
      const knotBreakpoint = breakpoints.find(bp => 
        bp.enabled && bp.type === 'knot' && currentKnotName.includes(bp.pattern)
      );
      if (knotBreakpoint) {
        setIsPaused(true);
        break;
      }
    }
    
    setOutput(prev => [...prev, ...newOutput]);
    setCurrentTags(prev => [...prev, ...newTags]);
    setCurrentKnot('main'); // Simplified
    
    const newChoices = (story.currentChoices || []).map(c => ({ 
      index: c.index, 
      text: c.text 
    }));
    setChoices(newChoices);
    
    // Update watched variables
    updateWatchedVariables();
  };

  const updateWatchedVariables = () => {
    if (!story) return;
    
    setWatchedVariables(prev => prev.map(watch => {
      // Simplified - in production, get actual values from story
      const currentValue = watch.value;
      const changed = false; // Simplified
      return {
        ...watch,
        previousValue: watch.value,
        value: currentValue,
        changed,
      };
    }));
  };

  const choose = (index: number) => {
    if (!story || isPaused) return;
    story.ChooseChoiceIndex(index);
    setIsPaused(false);
    continueStory();
  };

  const saveSnapshot = () => {
    if (!story) return;
    
    const snapshot = {
      variables: {}, // Simplified - in production, get actual variables
      currentPath: 'main',
      output,
      choices,
      currentTags,
      currentKnot,
      timestamp: Date.now(),
    };
    
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ink-snapshot-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSnapshot = async (file: File) => {
    try {
      const text = await file.text();
      const snapshot = JSON.parse(text);
      
      if (story) {
        // Restore variables - simplified
        // In production, properly restore story variables
        
        // Restore state
        setOutput(snapshot.output || []);
        setChoices(snapshot.choices || []);
        setCurrentTags(snapshot.currentTags || []);
        setCurrentKnot(snapshot.currentKnot || '');
        setIsPaused(false);
        
        updateWatchedVariables();
      }
    } catch (error) {
      console.error('Failed to load snapshot:', error);
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#f9fafb'
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: '#1f2937'
        }}>
          Ink Debugger
        </div>
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          marginTop: '2px'
        }}>
          {story ? 'Story loaded' : 'No story loaded'}
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        padding: '12px 16px', 
        borderBottom: '1px solid #d1d5db',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void loadStory(f);
            }}
            style={{ fontSize: '12px' }}
          />
          <button
            onClick={continueStory}
            disabled={!story || isPaused}
            style={{
              padding: '6px 12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {isPaused ? 'Resume' : 'Continue'}
          </button>
          <button
            onClick={saveSnapshot}
            disabled={!story}
            style={{
              padding: '6px 12px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            💾 Save Snapshot
          </button>
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void loadSnapshot(f);
            }}
            style={{ fontSize: '12px' }}
          />
        </div>
        
        {currentKnot && (
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Current: <strong>{currentKnot}</strong>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Knot Browser & Breakpoints */}
        <div style={{ width: '300px', borderRight: '1px solid #d1d5db', display: 'flex', flexDirection: 'column' }}>
          {/* Knot Browser */}
          <div style={{ flex: 1, padding: '12px', borderBottom: '1px solid #d1d5db' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Knot Browser
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>
              {knotTree.length === 0 ? 'No knots found' : `${knotTree.length} knots`}
            </div>
          </div>

          {/* Breakpoints */}
          <div style={{ flex: 1, padding: '12px', borderBottom: '1px solid #d1d5db' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Breakpoints
            </div>
            <div style={{ marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="Tag pattern (e.g., #MORALE)"
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid #d1d5db',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    addBreakpoint('tag', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
            <div style={{ maxHeight: '120px', overflow: 'auto' }}>
              {breakpoints.map(bp => (
                <div key={bp.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  marginBottom: '4px',
                  fontSize: '11px'
                }}>
                  <input
                    type="checkbox"
                    checked={bp.enabled}
                    onChange={() => toggleBreakpoint(bp.id)}
                  />
                  <span style={{ 
                    background: bp.type === 'tag' ? '#3b82f6' : '#10b981',
                    color: 'white',
                    padding: '1px 4px',
                    borderRadius: '2px',
                    fontSize: '10px'
                  }}>
                    {bp.type}
                  </span>
                  <span style={{ flex: 1, fontSize: '10px' }}>{bp.pattern}</span>
                  <button
                    onClick={() => removeBreakpoint(bp.id)}
                    style={{
                      padding: '1px 3px',
                      border: '1px solid #dc2626',
                      background: '#fef2f2',
                      color: '#dc2626',
                      borderRadius: '2px',
                      fontSize: '9px',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Variable Watchlist */}
          <div style={{ flex: 1, padding: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Variable Watchlist
            </div>
            <div style={{ marginBottom: '8px' }}>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addVariableWatch(e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{
                  width: '100%',
                  padding: '4px 6px',
                  border: '1px solid #d1d5db',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
              >
                <option value="">Add variable to watch...</option>
                {storyVariables.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div style={{ maxHeight: '120px', overflow: 'auto' }}>
              {watchedVariables.map(watch => (
                <div key={watch.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  marginBottom: '4px',
                  fontSize: '11px',
                  background: watch.changed ? '#fef3c7' : 'transparent',
                  padding: '2px 4px',
                  borderRadius: '2px'
                }}>
                  <span style={{ flex: 1, fontSize: '10px' }}>{watch.name}</span>
                  <span style={{ 
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: watch.changed ? '#92400e' : '#6b7280'
                  }}>
                    {String(watch.value)}
                  </span>
                  <button
                    onClick={() => removeVariableWatch(watch.id)}
                    style={{
                      padding: '1px 3px',
                      border: '1px solid #dc2626',
                      background: '#fef2f2',
                      color: '#dc2626',
                      borderRadius: '2px',
                      fontSize: '9px',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Output & Choices */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Output */}
          <div style={{ flex: 1, padding: '12px', borderBottom: '1px solid #d1d5db' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
              Output
            </div>
            <div style={{ 
              height: '200px',
              overflow: 'auto',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '11px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap'
            }}>
              {output.length === 0 ? (
                <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  No output yet. Load a story and continue to see output.
                </span>
              ) : (
                output.join('\n')
              )}
            </div>
          </div>

          {/* Choices */}
          {choices.length > 0 && (
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                Choices
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {choices.map((choice) => (
                  <button
                    key={choice.index}
                    onClick={() => choose(choice.index)}
                    style={{
                      padding: '6px 8px',
                      background: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '11px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Current Tags */}
          {currentTags.length > 0 && (
            <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                Current Tags
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {currentTags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#8b5cf6',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
