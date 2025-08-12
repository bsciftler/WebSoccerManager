import React, { useState, useMemo } from 'react';
import { Event, Variable, SearchResult } from '../types';

interface SearchProps {
  events: Event[];
  variables: Variable[];
  onResultSelect?: (result: SearchResult) => void;
}

export const Search: React.FC<SearchProps> = ({
  events,
  variables,
  onResultSelect,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search events
    events.forEach(event => {
      const matches: string[] = [];
      
      if (event.title.toLowerCase().includes(lowerQuery)) {
        matches.push(`Title: "${event.title}"`);
      }
      if (event.id.toLowerCase().includes(lowerQuery)) {
        matches.push(`ID: "${event.id}"`);
      }
      if (event.trigger?.expr?.toLowerCase().includes(lowerQuery)) {
        matches.push(`Trigger: "${event.trigger.expr}"`);
      }
      if (event.inkKnot?.toLowerCase().includes(lowerQuery)) {
        matches.push(`Ink Knot: "${event.inkKnot}"`);
      }
      
      event.effects.forEach(effect => {
        if (effect.target.toLowerCase().includes(lowerQuery)) {
          matches.push(`Effect Target: "${effect.target}"`);
        }
      });

      if (matches.length > 0) {
        results.push({
          type: 'event',
          id: event.id,
          title: event.title,
          matches,
        });
      }
    });

    // Search variables
    variables.forEach(variable => {
      const matches: string[] = [];
      
      if (variable.name.toLowerCase().includes(lowerQuery)) {
        matches.push(`Name: "${variable.name}"`);
      }
      if (variable.id.toLowerCase().includes(lowerQuery)) {
        matches.push(`ID: "${variable.id}"`);
      }
      if (variable.description?.toLowerCase().includes(lowerQuery)) {
        matches.push(`Description: "${variable.description}"`);
      }

      if (matches.length > 0) {
        results.push({
          type: 'variable',
          id: variable.id,
          title: variable.name,
          matches,
        });
      }
    });

    return results.slice(0, 10); // Limit to 10 results
  }, [query, events, variables]);

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search events, variables, triggers..."
          style={{
            width: '100%',
            padding: '8px 12px 8px 32px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '12px',
            background: '#ffffff',
          }}
        />
        <span style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '14px',
          color: '#6b7280',
        }}>
          🔍
        </span>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxHeight: '300px',
          overflow: 'auto',
          marginTop: '4px',
        }}>
          {searchResults.map((result, index) => (
            <div
              key={`${result.type}-${result.id}`}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: index < searchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
              }}
              onClick={() => handleResultClick(result)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '12px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: result.type === 'event' ? '#dbeafe' : '#fef3c7',
                  color: result.type === 'event' ? '#1e40af' : '#92400e',
                  fontWeight: '500',
                }}>
                  {result.type === 'event' ? '📋' : '🔧'}
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#374151',
                }}>
                  {result.title}
                </span>
              </div>
              
              <div style={{
                fontSize: '11px',
                color: '#6b7280',
                fontFamily: 'monospace',
                marginBottom: '4px',
              }}>
                {result.id}
              </div>

              <div style={{ fontSize: '11px', color: '#6b7280' }}>
                {result.matches.slice(0, 2).map((match, matchIndex) => (
                  <div key={matchIndex} style={{ marginBottom: '2px' }}>
                    {match}
                  </div>
                ))}
                {result.matches.length > 2 && (
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>
                    +{result.matches.length - 2} more matches
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim() && searchResults.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          marginTop: '4px',
          padding: '12px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280',
        }}>
          No results found for "{query}"
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
