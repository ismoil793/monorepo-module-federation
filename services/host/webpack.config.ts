import path from 'path';
import {buildWebpack, BuildMode, BuildPaths, BuildOptions} from '@packages/build-config'
import webpack from "webpack";
import packageJson from './package.json';

interface WebPackENVs {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
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
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    analyzer: env.analyzer ?? false,
    paths
  };
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3010';
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3011';

  const config = buildWebpack(buildOptions)

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host',
    filename: 'remoteEntry.js',

    // path to remote entries that we want to use in host
    remotes: {
      shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
      admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        // requiredVersion: packageJson.dependencies['react'],
      },
      'react-router-dom': {
        eager: true,
        // requiredVersion: packageJson.dependencies['react-router-dom'],
      },
      'react-dom': {
        eager: true,
        // requiredVersion: packageJson.dependencies['react-dom'],
      },
    },
  }))

  return config;
};
