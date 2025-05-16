import { GitHubLogoIcon } from '@radix-ui/react-icons';
import ReactLogo from './assets/react.svg';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { loadersConfig } from './config/loaders';
import { LoaderDialog } from '@/components/LoaderDialog';
export default function App() {
  const [progress, setProgress] = useState(0);
  const [selectedLoader, setSelectedLoader] = useState(null);

  setTimeout(() => {
    if (progress < 100) {
      setProgress(progress + 1);
    } else {
      setProgress(0);
    }
  }, 500);

  const globalState = {
    progress,
  };

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <header className="flex items-center px-8 py-4 border-b justify-between bg-gray-900">
        <a
          href={window.location.origin}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <div className="flex items-center">
            <img src={ReactLogo} alt="logo" className="h-8" />
          </div>
        </a>

        <a
          href="https://github.com/h4rdik11/lo8ding"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </a>
      </header>

      <div className="p-8 grid grid-cols-3 gap-4">
        {loadersConfig.map((loader) => {
          const LoaderComponent = loader.component;
          const props = loader.getProps
            ? { ...loader.props, ...loader.getProps(globalState) }
            : loader.props;

          return (
            <Card
              key={loader.id}
              className="bg-gray-800 hover:bg-gray-700 transform hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
              onClick={() => setSelectedLoader(loader)}
            >
              <CardHeader>
                <CardTitle className="text-white">{loader.name}</CardTitle>
                {loader.description && (
                  <CardDescription className="text-gray-300">
                    {loader.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="block grid grid-cols-1 justify-items-center">
                <LoaderComponent {...props} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Loader Dialog */}
      <LoaderDialog
        selectedLoader={selectedLoader}
        globalState={globalState}
        onClose={() => setSelectedLoader(null)}
      />
    </div>
  );
}
