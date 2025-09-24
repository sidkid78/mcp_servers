import { create } from 'zustand';
import { 
  BiStore, 
  Dataset, 
  DataProfile, 
  CorrelationResult, 
  VisualizationResult, 
  WorkflowResult,
  LoadingState,
  ErrorState 
} from '../types';

export const useBiStore = create<BiStore>((set) => ({
  // Initial state
  datasets: {},
  activeDataset: null,
  
  loading: {
    isLoading: false,
  },
  
  error: {
    hasError: false,
  },
  
  profiles: {},
  correlations: {},
  visualizations: {},
  workflows: {},
  
  // Actions
  setDataset: (name: string, dataset: Dataset) => {
    set((state) => ({
      datasets: {
        ...state.datasets,
        [name]: dataset,
      },
    }));
  },
  
  setActiveDataset: (name: string) => {
    set({ activeDataset: name });
  },
  
  setLoading: (loading: LoadingState) => {
    set({ loading });
  },
  
  setError: (error: ErrorState) => {
    set({ error });
  },
  
  setProfile: (datasetName: string, profile: DataProfile) => {
    set((state) => ({
      profiles: {
        ...state.profiles,
        [datasetName]: profile,
      },
    }));
  },
  
  setCorrelation: (key: string, correlation: CorrelationResult) => {
    set((state) => ({
      correlations: {
        ...state.correlations,
        [key]: correlation,
      },
    }));
  },
  
  setVisualization: (key: string, visualization: VisualizationResult) => {
    set((state) => ({
      visualizations: {
        ...state.visualizations,
        [key]: visualization,
      },
    }));
  },
  
  setWorkflow: (key: string, workflow: WorkflowResult) => {
    set((state) => ({
      workflows: {
        ...state.workflows,
        [key]: workflow,
      },
    }));
  },
  
  clearError: () => {
    set({
      error: {
        hasError: false,
      },
    });
  },
}));

// Selector hooks for common use cases
export const useActiveDataset = () => {
  const { datasets, activeDataset } = useBiStore();
  return activeDataset ? datasets[activeDataset] : null;
};

export const useDatasetNames = () => {
  const { datasets } = useBiStore();
  return Object.keys(datasets);
};

export const useLoading = () => {
  const { loading } = useBiStore();
  return loading;
};

export const useError = () => {
  const { error } = useBiStore();
  return error;
};

export const useProfile = (datasetName: string) => {
  const { profiles } = useBiStore();
  return profiles[datasetName];
};

export const useCorrelation = (key: string) => {
  const { correlations } = useBiStore();
  return correlations[key];
};

export const useVisualization = (key: string) => {
  const { visualizations } = useBiStore();
  return visualizations[key];
};

export const useWorkflow = (key: string) => {
  const { workflows } = useBiStore();
  return workflows[key];
};
