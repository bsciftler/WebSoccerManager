import { ProjectBundle, Event, Variable, GraphMeta, GraphNode, GraphEdge } from '../types';

export const exportProjectBundle = (
  variables: Variable[],
  events: Event[],
  graphMeta?: GraphMeta
): ProjectBundle => {
  return {
    version: 1,
    state: {
      variables,
    },
    events: {
      events,
    },
    graph: graphMeta || generateDefaultGraphMeta(events),
    editor: {
      outliner: {},
      timelines: {},
    },
  };
};

export const generateDefaultGraphMeta = (events: Event[]): GraphMeta => {
  const nodes: GraphNode[] = events.map((event, index) => ({
    id: event.id,
    type: 'event',
    position: { x: index * 200, y: index * 100 },
    data: { event },
  }));

  const edges: GraphEdge[] = [];

  return { nodes, edges };
};

export const exportStateJson = (variables: Variable[]): string => {
  return JSON.stringify({ variables }, null, 2);
};

export const exportEventsJson = (events: Event[]): string => {
  return JSON.stringify({ events }, null, 2);
};

export const exportGraphJson = (graphMeta: GraphMeta): string => {
  return JSON.stringify(graphMeta, null, 2);
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportAllFiles = (
  variables: Variable[],
  events: Event[],
  graphMeta?: GraphMeta
) => {
  // Export individual files
  downloadFile(exportStateJson(variables), 'state.json');
  downloadFile(exportEventsJson(events), 'events.json');
  downloadFile(exportGraphJson(graphMeta || generateDefaultGraphMeta(events)), 'graph.json');

  // Export bundle
  const bundle = exportProjectBundle(variables, events, graphMeta);
  downloadFile(JSON.stringify(bundle, null, 2), 'project-bundle.json');
};
