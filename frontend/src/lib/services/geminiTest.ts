import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';

const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'load_datasource',
    description: 'Load and analyze a data source file (CSV, Excel, JSON)',
    parameters: {
        type: Type.OBJECT,
      properties: {
        file: { type: Type.OBJECT, description: 'The file to load' },
        datasetName: { type: Type.STRING, description: 'Name for the dataset' }
      },
      required: ['file', 'datasetName']
    }
  }
];

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable not set');
}

const genAI = new GoogleGenAI({ apiKey });
const model = await genAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Hello, world!',
  config: {
    tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
  }
});

// Use the model to prevent unused variable error
console.log('Gemini model initialized:', model);

const response = await genAI.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Hello, world!',
  config: {
    tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
  }
});

console.log('Gemini response:', response.text);