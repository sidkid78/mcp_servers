import { GoogleGenerativeAI, FunctionDeclaration, SchemaType } from '@google/generative-ai';

const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'load_datasource',
    description: 'Load and analyze a data source file (CSV, Excel, JSON)',
    parameters: {
        type: SchemaType.OBJECT,
      properties: {
        file: { type: SchemaType.OBJECT, description: 'The file to load' },
        datasetName: { type: SchemaType.STRING, description: 'Name for the dataset' }
      },
      required: ['file', 'datasetName']
    }
  }
];

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
 model: 'gemini-2.0-flash-001',
  tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
});

// Use the model to prevent unused variable error
console.log('Gemini model initialized:', model.model); 