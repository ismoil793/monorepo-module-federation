import path from 'path';
import webpack from "webpack";
import {buildWebpack, BuildMode, BuildPaths, BuildOptions} from '@packages/build-config'
import packageJson from './package.json';

interface WebPackENVs {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: WebPackENVs) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    publicFolder: path.resolve(__dirname, 'public')
  };

  const buildOptions: BuildOptions = {
    port: env.port ?? 3011,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer ?? false,
    paths
  };

  const config = buildWebpack(buildOptions)

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'admin',
    filename: 'remoteEntry.js', // filename that will connect, by default remoteEntry is used usually
    // most important setting, we state here what we want to provide to container application
    // in our case container app is /host
    exposes: {
      './Router': './src/router/Router.tsx',
    },
    shared: {
      ...packageJson.dependencies,
      // ...packageJson.dependencies will do the job,
      // but it is a good practice to define react dependencies versions explicitly,
      react: {
        eager: true, // eager-loading means instantly download, it is the opposite of lazy-loading
        requiredVersion: packageJson.dependencies['react'],
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom'],
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom'],
      },
    },
  }))

  return config;
};
