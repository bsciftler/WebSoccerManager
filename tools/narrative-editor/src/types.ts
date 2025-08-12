import { z } from 'zod';

// Base types
export type VariableType = 'int' | 'float' | 'bool' | 'string' | 'enum';
export type VariableScope = 'global' | 'team' | 'player' | 'coach';
export type EffectOp = 'set' | 'inc' | 'dec' | 'flag';
export type NodeType = 'event' | 'knot' | 'group' | 'gateway';
export type RepeatPolicy = 'never' | 'once-per-season' | 'cooldown';

// Zod schemas
export const VariableSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['int', 'float', 'bool', 'string', 'enum']),
  scope: z.enum(['global', 'team', 'player', 'coach']),
  initial: z.union([z.number(), z.boolean(), z.string()]),
  constraints: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    values: z.array(z.string()).optional(),
  }).optional(),
  description: z.string().optional(),
});

export const EventEffectSchema = z.object({
  op: z.enum(['set', 'inc', 'dec', 'flag']),
  target: z.string(),
  value: z.union([z.number(), z.string(), z.boolean()]).optional(),
});

export const TriggerAstSchema: z.ZodType<any> = z.object({
  type: z.enum(['condition', 'and', 'or', 'not']),
  left: z.union([z.string(), z.lazy(() => TriggerAstSchema)]).optional(),
  right: z.union([z.string(), z.lazy(() => TriggerAstSchema)]).optional(),
  operator: z.string().optional(),
  value: z.union([z.number(), z.string(), z.boolean()]).optional(),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  weight: z.number(),
  trigger: z.object({
    ast: TriggerAstSchema.optional(),
    expr: z.string().optional(),
  }).optional(),
  effects: z.array(EventEffectSchema),
  inkKnot: z.string().optional(),
  weekWindow: z.object({
    from: z.number(),
    to: z.number(),
  }).optional(),
  repeat: z.enum(['never', 'once-per-season', 'cooldown']).optional(),
  cooldownWeeks: z.number().optional(),
});

export const GraphNodeSchema = z.object({
  id: z.string(),
  type: z.enum(['event', 'knot', 'group', 'gateway']),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.string(), z.any()),
});

export const GraphEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
  conditionExpr: z.string().optional(),
  weightMod: z.number().optional(),
});

export const GraphMetaSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
});

export const ProjectBundleSchema = z.object({
  version: z.number(),
  state: z.object({
    variables: z.array(VariableSchema),
  }),
  events: z.object({
    events: z.array(EventSchema),
  }),
  graph: GraphMetaSchema,
  editor: z.object({
    outliner: z.any().optional(),
    timelines: z.any().optional(),
  }).optional(),
});

// TypeScript types derived from schemas
export type Variable = z.infer<typeof VariableSchema>;
export type EventEffect = z.infer<typeof EventEffectSchema>;
export type TriggerAst = z.infer<typeof TriggerAstSchema>;
export type Event = z.infer<typeof EventSchema>;
export type GraphNode = z.infer<typeof GraphNodeSchema>;
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;
export type GraphMeta = z.infer<typeof GraphMetaSchema>;
export type ProjectBundle = z.infer<typeof ProjectBundleSchema>;

// Additional types for the editor
export interface InspectorTab {
  key: string;
  label: string;
  component: React.ComponentType<any>;
}

export interface SearchResult {
  type: 'event' | 'variable' | 'knot';
  id: string;
  title: string;
  matches: string[];
}
