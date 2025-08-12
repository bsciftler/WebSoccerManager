import React, { useState } from 'react';
import { Event, Variable } from '../../types';
import { TriggerBuilder } from '../TriggerBuilder';

interface TriggerTabProps {
  event: Event;
  variables: Variable[];
  onUpdate: (updates: Partial<Event>) => void;
}

export const TriggerTab: React.FC<TriggerTabProps> = ({
  event,
  variables,
  onUpdate,
}) => {
  const [expression, setExpression] = useState(event.trigger?.expr || '');

  const handleExpressionChange = (newExpr: string) => {
    setExpression(newExpr);
    onUpdate({
      trigger: {
        expr: newExpr,
      },
    });
  };

  const validateExpression = (expr: string): string[] => {
    const errors: string[] = [];
    
    // Check for undefined variables
    const variableIds = variables.map(v => v.id);
    const usedVars = expr.match(/\b\w+\b/g) || [];
    
    usedVars.forEach(varName => {
      if (!variableIds.includes(varName) && 
          !['true', 'false', 'and', 'or', 'not', '>', '<', '>=', '<=', '==', '!='].includes(varName)) {
        errors.push(`Undefined variable: ${varName}`);
      }
    });

    return errors;
  };

  const errors = validateExpression(expression);

  const astToString = (ast: any): string => {
    if (!ast) return '';
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
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '8px'
        }}>
          Trigger Expression
        </label>
        <textarea
          value={expression}
          onChange={(e) => handleExpressionChange(e.target.value)}
          placeholder="Enter trigger condition (e.g., morale > 0.5 and week == 3)"
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            resize: 'vertical',
          }}
        />
        {errors.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            {errors.map((error, index) => (
              <div key={index} style={{ 
                fontSize: '11px', 
                color: '#dc2626',
                marginBottom: '4px'
              }}>
                ⚠️ {error}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#374151',
          marginBottom: '8px'
        }}>
          Visual Trigger Builder
        </label>
        <TriggerBuilder
          variables={variables}
          value={event.trigger?.ast}
          onChange={(ast) => {
            onUpdate({
              trigger: {
                ast,
                expr: astToString(ast),
              },
            });
          }}
        />
      </div>

      <div style={{ 
        fontSize: '11px', 
        color: '#6b7280',
        padding: '8px',
        background: '#f3f4f6',
        borderRadius: '4px'
      }}>
        <strong>Expression Tips:</strong>
        <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
          <li>Use variables like: <code>morale</code>, <code>week</code></li>
          <li>Comparisons: <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code></li>
          <li>Logic: <code>and</code>, <code>or</code>, <code>not</code></li>
          <li>Examples: <code>morale &gt; 0.5 and week == 3</code></li>
        </ul>
      </div>
    </div>
  );
};
