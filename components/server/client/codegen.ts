import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../server/src/graphql/schema.graphql',
  documents: ['./src/**/*.ts'],
  generates: {
    // './src/types.ts': {
    //   plugins: ['typescript'],
    // },
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
