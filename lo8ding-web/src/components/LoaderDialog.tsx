import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface LoaderDialogProps {
  selectedLoader: any;
  globalState: any;
  onClose: () => void;
}

export function LoaderDialog({
  selectedLoader,
  globalState,
  onClose,
}: LoaderDialogProps) {
  const [editedProps, setEditedProps] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);

  // Reset edited props when loader selection changes
  useEffect(() => {
    if (selectedLoader) {
      // Initialize with the current props rather than empty object
      setEditedProps(selectedLoader.props || {});
    } else {
      setEditedProps({});
    }
  }, [selectedLoader]);

  // Handle prop value changes with proper type conversion
  const handlePropChange = (key: string, value: any, originalType: any) => {
    let convertedValue: any;

    // Convert input string to the appropriate type based on the original value
    if (typeof originalType === 'number') {
      convertedValue = Number(value);
    } else if (typeof originalType === 'boolean') {
      // For checkboxes, value is already boolean
      convertedValue = value;
    } else {
      // For string values, use the string directly
      convertedValue = value;
    }

    // Update the edited props with the correctly typed value
    setEditedProps((prev) => {
      return {
        ...prev,
        [key]: convertedValue,
      };
    });
  };

  // Copy code to clipboard
  const copyCode = () => {
    const codeString = generateCodeString();
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate component code string with props on new lines
  const generateCodeString = () => {
    if (!selectedLoader) return '';

    const componentName = selectedLoader.component.displayName || 'Loader';
    const baseProps = selectedLoader.props || {};
    const allProps = { ...baseProps, ...editedProps };

    if (selectedLoader.getProps) {
      // Include dynamic props like progress
      const dynamicProps = Object.keys(selectedLoader.getProps(globalState));
      dynamicProps.forEach((key) => {
        allProps[key] = `{${key}}`;
      });
    }

    // Format props with each on a new line
    const propsString = Object.entries(allProps)
      .map(([key, value]) => {
        if (typeof value === 'string' && !value.startsWith('{')) {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return `  ${key}={${value}}`;
        } else {
          return `  ${key}=${value}`;
        }
      })
      .join('\n');

    // If we have props, format with line breaks, otherwise keep it inline
    return `import { ${componentName} } from '@h4rdik11/lo8ding-lib';\n\n<${componentName}${
      propsString ? '\n' + propsString + '\n' : ' '
    }/>`;
  };

  return (
    <Dialog
      open={selectedLoader !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{selectedLoader?.name}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {selectedLoader?.description ||
              'Customize this loader to fit your needs'}
          </DialogDescription>
        </DialogHeader>

        {selectedLoader && (
          <>
            {/* Loader Preview */}
            <div className="p-8 bg-gray-900 rounded-md block grid grid-cols-1 justify-items-center">
              {(() => {
                if (!selectedLoader) return null;

                const LoaderComponent = selectedLoader.component;
                const baseProps = selectedLoader.props || {};
                const dynamicProps = selectedLoader.getProps
                  ? selectedLoader.getProps(globalState)
                  : {};

                // Combine all props, with editedProps having highest priority
                const allProps = {
                  ...baseProps,
                  ...dynamicProps,
                  ...editedProps,
                };

                return <LoaderComponent {...allProps} />;
              })()}
            </div>

            {/* Props Editor */}
            <div className="grid gap-4 py-4">
              <h3 className="text-sm font-medium mb-2">Customize Props</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedLoader.props &&
                  Object.entries(selectedLoader.props).map(([key, value]) => (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm">{key}</label>
                      {typeof value === 'boolean' ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            {editedProps[key] !== undefined
                              ? editedProps[key]
                                ? 'true'
                                : 'false'
                              : value
                                ? 'true'
                                : 'false'}
                          </span>

                          <Switch
                            checked={
                              editedProps[key] !== undefined
                                ? editedProps[key]
                                : value
                            }
                            onCheckedChange={(checked) =>
                              handlePropChange(key, checked, value)
                            }
                          />
                        </div>
                      ) : (
                        <Input
                          value={
                            editedProps[key] !== undefined
                              ? String(editedProps[key])
                              : String(value)
                          }
                          onChange={(e) =>
                            handlePropChange(key, e.target.value, value)
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      )}
                    </div>
                  ))}
                {selectedLoader.getProps &&
                  Object.entries(selectedLoader.getProps(globalState)).map(
                    ([key, value]) => (
                      <div key={key} className="flex flex-col gap-2">
                        <label className="text-sm">{key} (dynamic)</label>
                        <Input
                          value={value != null ? String(value) : ''}
                          disabled
                          className="bg-gray-700 border-gray-600 text-gray-400"
                        />
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Code Preview */}
            <div className="relative">
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
                <code>{generateCodeString()}</code>
              </pre>
              <button
                className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                onClick={copyCode}
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </>
        )}

        <DialogFooter>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
