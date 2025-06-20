import React, { useState, useRef } from 'react';
import { Info, ImagePlus, Zap, Square, RectangleVertical as Rectangle, RectangleVertical, Sparkles, Wand2 } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import { generateImageWithFal } from '../services/fal';

const availableModels = [
  { id: 'fal-ai/flux-pro', name: 'FLUX Pro' },
  { id: 'fal-ai/flux-dev', name: 'FLUX Dev' }
];

const availableAspectRatios = [
  { id: '1:1', name: 'Square 1:1', icon: Square },
  { id: '16:9', name: 'Landscape 16:9', icon: Rectangle },
  { id: '9:16', name: 'Portrait 9:16', icon: RectangleVertical },
];

const SliderWithSteps = ({ value, onChange, min = 0, max = 2, step = 1, labels }: { 
  value: number; 
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
}) => {
  const defaultLabels = ['Subtle', 'Balanced', 'Strong'];
  const displayLabels = labels || defaultLabels;
  
  return (
    <div className="space-y-1">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-gray-200 dark:bg-neutral-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:dark:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:dark:bg-white [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="flex justify-between px-1 text-[10px] text-gray-500">
        {displayLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default function StylizeIt() {
  const [selectedModel, setSelectedModel] = useState(availableModels[0].id);
  const [styleStrength, setStyleStrength] = useState(0.8);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [promptText, setPromptText] = useState('');
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [styleImageFile, setStyleImageFile] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [inferenceSteps, setInferenceSteps] = useState(28);
  const [guidanceScale, setGuidanceScale] = useState(3.5);

  const styleImageRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStyleImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setStyleImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const triggerFileInput = () => {
    styleImageRef.current?.click();
  };

  const handleGenerate = async () => {
    if (!styleImageFile) {
      setApiError('Please upload a style reference image');
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');
      
      const [width, height] = selectedAspectRatio === '1:1' ? [1024, 1024] :
                             selectedAspectRatio === '16:9' ? [1344, 768] :
                             [768, 1344];
      
      const imageUrl = await generateImageWithFal({
        model: selectedModel,
        prompt: promptText,
        image_url: styleImageFile,
        width,
        height,
        num_inference_steps: inferenceSteps,
        guidance_scale: guidanceScale,
        strength: styleStrength,
        enable_safety_checker: true
      });
      
      setGeneratedImageUrl(imageUrl);
    } catch (error: any) {
      setApiError(error.message || 'Failed to generate image. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const findAspectRatio = (id: string) => {
    return availableAspectRatios.find((r) => r.id === id);
  };

  const selectedRatio = findAspectRatio(selectedAspectRatio);
  const Icon = selectedRatio?.icon || Square;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-medium">AMINEJOURNEY</h1>
          <span className="text-sm text-neutral-400">v1.0 alpha</span>
        </div>
        <div className="text-right">
          <h2 className="text-base font-medium">Workflow: Style Transfer</h2>
        </div>
      </div>

      <div className="flex flex-1 gap-5 min-h-0 overflow-hidden">
        {/* Left Column - Parameters */}
        <div className="w-[352px] overflow-y-auto">
          <div className="space-y-5 pr-4">
            {/* Model Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Model</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <Listbox value={selectedModel} onChange={setSelectedModel}>
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-neutral-800 rounded-lg text-left text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
                    {availableModels.find(m => m.id === selectedModel)?.name}
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-h-48 overflow-auto text-sm">
                    {availableModels.map((model) => (
                      <Listbox.Option
                        key={model.id}
                        value={model.id}
                        className={({ active }) =>
                          `${active ? 'bg-gray-100 dark:bg-neutral-700' : ''} cursor-pointer select-none relative py-2 px-4`
                        }
                      >
                        {model.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Style Reference */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Style Reference</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="file"
                ref={styleImageRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={triggerFileInput}
                className="w-full aspect-video rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {styleImage ? (
                  <img src={styleImage} alt="Style Reference" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <ImagePlus className="w-6 h-6 text-neutral-500" />
                )}
              </button>
            </div>

            {/* Style Strength */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Style Strength</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <SliderWithSteps 
                value={styleStrength} 
                onChange={setStyleStrength}
                min={0.1}
                max={1.0}
                step={0.1}
                labels={['Subtle', 'Balanced', 'Strong']}
              />
            </div>

            {/* Inference Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Inference Steps</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <SliderWithSteps 
                value={inferenceSteps} 
                onChange={setInferenceSteps}
                min={1}
                max={50}
                step={1}
                labels={['Fast', 'Balanced', 'Quality']}
              />
              <div className="text-xs text-neutral-400 text-center">{inferenceSteps} steps</div>
            </div>

            {/* Guidance Scale */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Guidance Scale</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <SliderWithSteps 
                value={guidanceScale} 
                onChange={setGuidanceScale}
                min={1.0}
                max={20.0}
                step={0.5}
                labels={['Creative', 'Balanced', 'Precise']}
              />
              <div className="text-xs text-neutral-400 text-center">{guidanceScale}</div>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Aspect Ratio</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <Listbox value={selectedAspectRatio} onChange={setSelectedAspectRatio}>
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-neutral-800 rounded-lg text-left text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{selectedRatio?.name}</span>
                    </div>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-h-48 overflow-auto text-sm">
                    {availableAspectRatios.map((ratio) => (
                      <Listbox.Option
                        key={ratio.id}
                        value={ratio.id}
                        className={({ active }) =>
                          `${active ? 'bg-gray-100 dark:bg-neutral-700' : ''} cursor-pointer select-none relative py-2 px-4 flex items-center gap-2`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <ratio.icon className="w-4 h-4" />
                            <span className={selected ? 'font-medium' : ''}>{ratio.name}</span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>

        {/* Right Column - Preview and Prompt */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Preview Area */}
          <div className="flex-1 rounded-xl flex items-center justify-center relative overflow-hidden mb-4">
            {generatedImageUrl ? (
              <img src={generatedImageUrl} alt="Generated" className="max-h-[calc(100vh-20rem)] object-contain rounded-lg" />
            ) : (
              <div className="text-center px-6 relative z-10">
                <div className="flex flex-col items-center mb-4">
                  <Wand2 className="w-12 h-12 mb-2 animate-gradient-x bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-110" />
                  <Sparkles className="w-6 h-6 animate-gradient-x bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent" />
                </div>
                <h2 className="text-xl font-medium text-neutral-400 mb-2">Start style transfer</h2>
                <p className="text-sm text-neutral-400 max-w-lg mx-auto">
                  Upload a style reference image and describe what you want to generate. The AI will create a new image that matches both your prompt and the style of your reference image.
                </p>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center">
                <p className="text-neutral-300">Generating your image...</p>
              </div>
            )}
          </div>

          {/* Prompt Area */}
          <div className="bg-white dark:bg-neutral-850 p-4 rounded-xl">
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Prompt</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <button 
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors group"
                onClick={() => {
                  console.log('Boosting prompt...');
                }}
              >
                <Zap className="w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm">BOOST your prompt</span>
              </button>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-24 px-4 py-3 text-base bg-gray-100 dark:bg-neutral-800 rounded-xl resize-none"
                placeholder="Describe what you want to generate..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !styleImage || !promptText.trim()}
                className={`absolute right-4 bottom-4 px-5 py-2 text-base rounded-lg transition-colors ${
                  isLoading || !styleImage || !promptText.trim()
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                Generate
              </button>
            </div>
            {apiError && (
              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 text-sm text-center">{apiError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}