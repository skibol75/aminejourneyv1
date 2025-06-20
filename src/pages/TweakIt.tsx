import React, { useState, useRef } from 'react';
import { Info, ImagePlus, Zap, Square, RectangleVertical as Rectangle, RectangleVertical, Sparkles, Wand2, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import { generateImageWithFal, uploadImageToFal } from '../services/fal';

const availableModels = [
  { id: 'flux-pro-kontext', name: 'FLUX Pro Kontext' }
];

const availableAspectRatios = [
  { id: '1:1', name: 'Square 1:1', icon: Square, width: 1024, height: 1024 },
  { id: '16:9', name: 'Landscape 16:9', icon: Rectangle, width: 1344, height: 768 },
  { id: '9:16', name: 'Portrait 9:16', icon: RectangleVertical, width: 768, height: 1344 },
];

const SliderWithValue = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 0.1 
}: { 
  label: string;
  value: number; 
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{label}</label>
        <span className="text-sm text-neutral-500">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer"
      />
    </div>
  );
};

export default function TweakIt() {
  const [selectedModel, setSelectedModel] = useState(availableModels[0].id);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [promptText, setPromptText] = useState('');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceImageFile, setSourceImageFile] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  // Parameters exactly from Fal.ai FLUX Pro Kontext OpenAPI spec
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [safetyTolerance, setSafetyTolerance] = useState('2');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const sourceImageRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSourceImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSourceImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const triggerFileInput = () => {
    sourceImageRef.current?.click();
  };

  const handleGenerate = async () => {
    if (!sourceImageFile) {
      setApiError('Please upload a source image to edit');
      return;
    }

    if (!promptText.trim()) {
      setApiError('Please enter a prompt describing your desired changes');
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');
      
      // Upload image to Fal.ai first
      const imageUrl = await uploadImageToFal(sourceImageFile);
      
      // Get dimensions from selected aspect ratio
      const selectedRatio = availableAspectRatios.find(r => r.id === selectedAspectRatio);
      const { width, height } = selectedRatio || { width: 1024, height: 1024 };
      
      // Generate image with Fal.ai using exact OpenAPI parameters
      const generatedUrl = await generateImageWithFal({
        prompt: promptText,
        image_url: imageUrl,
        width,
        height,
        guidance_scale: guidanceScale
      });
      
      setGeneratedImageUrl(generatedUrl);
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
          <h2 className="text-base font-medium">Workflow: Image Editing & Enhancement</h2>
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
                </div>
              </Listbox>
            </div>

            {/* Source Image */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Source Image</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="file"
                ref={sourceImageRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={triggerFileInput}
                className="w-full aspect-video rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors border-2 border-dashed border-gray-300 dark:border-neutral-600"
              >
                {sourceImage ? (
                  <img src={sourceImage} alt="Source Image" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-neutral-500" />
                    <span className="text-sm text-neutral-500">Upload image to edit</span>
                  </div>
                )}
              </button>
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

            {/* Advanced Parameters - Collapsible */}
            <div className="space-y-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium">Advanced Parameters</h3>
                  <Info className="w-4 h-4 text-neutral-400" />
                </div>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>
              
              {showAdvanced && (
                <div className="space-y-4 pl-2 border-l-2 border-gray-200 dark:border-neutral-700">
                  <SliderWithValue
                    label="Guidance Scale"
                    value={guidanceScale}
                    onChange={setGuidanceScale}
                    min={1}
                    max={20}
                    step={0.1}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Safety Tolerance</label>
                    <select
                      value={safetyTolerance}
                      onChange={(e) => setSafetyTolerance(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-neutral-800 rounded-lg text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <option value="1">1 - Most Strict</option>
                      <option value="2">2 - Strict</option>
                      <option value="3">3 - Moderate</option>
                      <option value="4">4 - Permissive</option>
                      <option value="5">5 - Most Permissive</option>
                      <option value="6">6 - Unrestricted</option>
                    </select>
                  </div>
                </div>
              )}
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
                  <Wand2 className="w-12 h-12 mb-2 animate-gradient-x bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-110" />
                  <Sparkles className="w-6 h-6 animate-gradient-x bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent" />
                </div>
                <h2 className="text-xl font-medium text-neutral-400 mb-2">Start tweaking your images</h2>
                <p className="text-sm text-neutral-400 max-w-lg mx-auto">
                  Upload an image and describe the changes you want to make. The AI will intelligently edit your image while preserving its original structure and quality.
                </p>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                  <p className="text-neutral-300">Tweaking your image...</p>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Area */}
          <div className="bg-white dark:bg-neutral-850 p-4 rounded-xl">
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Edit Prompt</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <button 
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors group"
                onClick={() => {
                  console.log('Boosting prompt...');
                }}
              >
                <Zap className="w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm">BOOST your edit prompt</span>
              </button>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-24 px-4 py-3 text-base bg-gray-100 dark:bg-neutral-800 rounded-xl resize-none"
                placeholder="Describe the changes you want to make to your image..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !sourceImage || !promptText.trim()}
                className={`absolute right-4 bottom-4 px-5 py-2 text-base rounded-lg transition-colors ${
                  isLoading || !sourceImage || !promptText.trim()
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {isLoading ? 'Tweaking...' : 'Tweak It'}
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