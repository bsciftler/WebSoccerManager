import React, { useState } from 'react';
import { TriggerAst, Variable } from '../types';

interface TriggerBuilderProps {
  variables: Variable[];
  value?: TriggerAst;
  onChange: (ast: TriggerAst) => void;
}

type ConditionType = 'condition' | 'and' | 'or' | 'not';

interface ConditionNode {
  id: string;
  type: ConditionType;
  variable?: string;
  operator?: string;
  value?: string | number | boolean;
  children?: ConditionNode[];
}

export const TriggerBuilder: React.FC<TriggerBuilderProps> = ({
  variables,
  value,
  onChange,
}) => {
  const [conditions, setConditions] = useState<ConditionNode[]>(() => {
    if (value) {
      return astToNodes(value);
    }
    return [];
  });

  const addCondition = (parentId?: string) => {
    const newCondition: ConditionNode = {
      id: `cond_${Date.now()}`,
      type: 'condition',
      variable: '',
      operator: '==',
      value: '',
    };

    if (parentId) {
      setConditions(prev => updateNodeChildren(prev, parentId, [...(getNodeById(prev, parentId)?.children || []), newCondition]));
    } else {
      setConditions(prev => [...prev, newCondition]);
    }
  };

  const addGroup = (parentId?: string, groupType: 'and' | 'or' = 'and') => {
    const newGroup: ConditionNode = {
      id: `group_${Date.now()}`,
      type: groupType,
      children: [],
    };

    if (parentId) {
      setConditions(prev => updateNodeChildren(prev, parentId, [...(getNodeById(prev, parentId)?.children || []), newGroup]));
    } else {
      setConditions(prev => [...prev, newGroup]);
    }
  };

  const updateCondition = (id: string, updates: Partial<ConditionNode>) => {
    setConditions(prev => updateNode(prev, id, updates));
  };

  const removeCondition = (id: string) => {
    setConditions(prev => removeNode(prev, id));
  };

  const getNodeById = (nodes: ConditionNode[], id: string): ConditionNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = getNodeById(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const updateNode = (nodes: ConditionNode[], id: string, updates: Partial<ConditionNode>): ConditionNode[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, ...updates };
      }
      if (node.children) {
        return { ...node, children: updateNode(node.children, id, updates) };
      }
      return node;
    });
  };

  const updateNodeChildren = (nodes: ConditionNode[], id: string, children: ConditionNode[]): ConditionNode[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, children };
      }
      if (node.children) {
        return { ...node, children: updateNodeChildren(node.children, id, children) };
      }
      return node;
    });
  };

  const removeNode = (nodes: ConditionNode[], id: string): ConditionNode[] => {
    return nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) {
        node.children = removeNode(node.children, id);
      }
      return true;
    });
  };

  const astToNodes = (ast: TriggerAst): ConditionNode[] => {
    // Simple conversion - in a real implementation, this would be more sophisticated
    return [{
      id: 'root',
      type: ast.type,
      variable: ast.operator,
      operator: ast.operator,
      value: ast.value,
      children: ast.left && typeof ast.left === 'object' ? astToNodes(ast.left) : undefined,
    }];
  };

  const nodesToAst = (nodes: ConditionNode[]): TriggerAst | null => {
    if (nodes.length === 0) return null;
    if (nodes.length === 1) return nodeToAst(nodes[0]);
    
    // Multiple root nodes are wrapped in an AND group
    return {
      type: 'and',
      left: nodeToAst(nodes[0]),
      right: nodesToAst(nodes.slice(1)),
    };
  };

  const nodeToAst = (node: ConditionNode): TriggerAst => {
    if (node.type === 'condition') {
      return {
        type: 'condition',
        operator: node.operator || '==',
        value: node.value,
      };
    }
    
    if (node.children && node.children.length > 0) {
      if (node.children.length === 1) {
        return nodeToAst(node.children[0]);
      }
      
      // For multiple children, create a chain of operations
      let result = nodeToAst(node.children[0]);
      for (let i = 1; i < node.children.length; i++) {
        result = {
          type: node.type,
          left: result,
          right: nodeToAst(node.children[i]),
        };
      }
      return result;
    }
    
    return { type: 'condition', operator: '==', value: true };
  };

  const renderCondition = (condition: ConditionNode, depth: number = 0) => {
    const indent = depth * 20;

    if (condition.type === 'condition') {
      return (
        <div key={condition.id} style={{ marginLeft: indent, marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={condition.variable || ''}
              onChange={(e) => updateCondition(condition.id, { variable: e.target.value })}
              style={{
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
                minWidth: '120px',
              }}
            >
              <option value="">Select variable...</option>
              {variables.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>

            <select
              value={condition.operator || '=='}
              onChange={(e) => updateCondition(condition.id, { operator: e.target.value })}
              style={{
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              <option value="==">equals</option>
              <option value="!=">not equals</option>
              <option value=">">greater than</option>
              <option value="<">less than</option>
              <option value=">=">greater or equal</option>
              <option value="<=">less or equal</option>
            </select>

            <input
              type="text"
              value={String(condition.value || '')}
              onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
              placeholder="Value"
              style={{
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
                width: '80px',
              }}
            />

            <button
              onClick={() => removeCondition(condition.id)}
              style={{
                padding: '2px 6px',
                border: '1px solid #dc2626',
                background: '#fef2f2',
                color: '#dc2626',
                borderRadius: '3px',
                fontSize: '10px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={condition.id} style={{ marginLeft: indent, marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{
            padding: '4px 8px',
            background: condition.type === 'and' ? '#dbeafe' : '#fef3c7',
            color: condition.type === 'and' ? '#1e40af' : '#92400e',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
            textTransform: 'uppercase',
          }}>
            {condition.type}
          </div>

          <button
            onClick={() => addCondition(condition.id)}
            style={{
              padding: '2px 6px',
              border: '1px solid #10b981',
              background: '#f0fdf4',
              color: '#10b981',
              borderRadius: '3px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            + Condition
          </button>

          <button
            onClick={() => addGroup(condition.id, 'and')}
            style={{
              padding: '2px 6px',
              border: '1px solid #3b82f6',
              background: '#eff6ff',
              color: '#3b82f6',
              borderRadius: '3px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            + AND
          </button>

          <button
            onClick={() => addGroup(condition.id, 'or')}
            style={{
              padding: '2px 6px',
              border: '1px solid #f59e0b',
              background: '#fffbeb',
              color: '#f59e0b',
              borderRadius: '3px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            + OR
          </button>

          <button
            onClick={() => removeCondition(condition.id)}
            style={{
              padding: '2px 6px',
              border: '1px solid #dc2626',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '3px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: '12px' }}>
          {condition.children?.map(child => renderCondition(child, depth + 1))}
        </div>
      </div>
    );
  };

  const generateExpression = () => {
    const ast = nodesToAst(conditions);
    if (!ast) return '';
    
    // Simple expression generation
    return astToString(ast);
  };

  const astToString = (ast: TriggerAst): string => {
    if (ast.type === 'condition') {
      return `${ast.operator || ''} ${ast.value || ''}`;
    }
    
    const left = ast.left && typeof ast.left === 'object' ? astToString(ast.left) : ast.left;
    const right = ast.right && typeof ast.right === 'object' ? astToString(ast.right) : ast.right;
    
    if (ast.type === 'and') {
      return `(${left} and ${right})`;
    }
    if (ast.type === 'or') {
      return `(${left} or ${right})`;
    }
    if (ast.type === 'not') {
      return `not (${left})`;
    }
    
    return `${left} ${right}`;
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#374151'
          }}>
            Visual Trigger Builder
          </label>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => addCondition()}
              style={{
                padding: '4px 8px',
                border: '1px solid #10b981',
                background: '#f0fdf4',
                color: '#10b981',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              + Condition
            </button>
            <button
              onClick={() => addGroup(undefined, 'and')}
              style={{
                padding: '4px 8px',
                border: '1px solid #3b82f6',
                background: '#eff6ff',
                color: '#3b82f6',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              + AND Group
            </button>
            <button
              onClick={() => addGroup(undefined, 'or')}
              style={{
                padding: '4px 8px',
                border: '1px solid #f59e0b',
                background: '#fffbeb',
                color: '#f59e0b',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              + OR Group
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #d1d5db', 
        borderRadius: '6px', 
        padding: '12px',
        background: '#f9fafb',
        minHeight: '200px'
      }}>
        {conditions.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6b7280',
            fontStyle: 'italic',
            fontSize: '12px'
          }}>
            No conditions defined. Add a condition or group to get started.
          </div>
        ) : (
          <div>
            {conditions.map(condition => renderCondition(condition))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '8px'
        }}>
          Generated Expression
        </label>
        <textarea
          value={generateExpression()}
          readOnly
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            background: '#f9fafb',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  );
};
