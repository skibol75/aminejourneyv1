import React, { useState, useRef } from 'react';
import { Info, ImagePlus, Zap, Square, RectangleVertical as Rectangle, RectangleVertical, Sparkles, Wand2, Upload, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import { generateVideoWithFal, uploadImageToFal } from '../services/fal';

const availableDurations = [
  { id: '6', name: '6 seconds' },
  { id: '10', name: '10 seconds' }
];

export default function VideoIt() {
  const [selectedDuration, setSelectedDuration] = useState('6');
  const [promptOptimizer, setPromptOptimizer] = useState(true);
  const [promptText, setPromptText] = useState('');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceImageFile, setSourceImageFile] = useState<File | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
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
      setApiError('Please upload a source image to animate');
      return;
    }

    if (!promptText.trim()) {
      setApiError('Please enter a prompt describing the video animation');
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');
      
      // Upload image to Fal.ai first
      const imageUrl = await uploadImageToFal(sourceImageFile);
      
      // Generate video with Fal.ai using the Minimax Hailuo-02 model
      const videoUrl = await generateVideoWithFal({
        prompt: promptText,
        image_url: imageUrl,
        duration: selectedDuration,
        prompt_optimizer: promptOptimizer
      });
      
      setGeneratedVideoUrl(videoUrl);
    } catch (error: any) {
      setApiError(error.message || 'Failed to generate video. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-medium">AMINEJOURNEY</h1>
          <span className="text-sm text-neutral-400">v1.0 alpha</span>
        </div>
        <div className="text-right">
          <h2 className="text-base font-medium">Workflow: Image to Video Generation</h2>
        </div>
      </div>

      <div className="flex flex-1 gap-5 min-h-0 overflow-hidden">
        {/* Left Column - Parameters */}
        <div className="w-[352px] overflow-y-auto">
          <div className="space-y-5 pr-4">
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
                    <span className="text-sm text-neutral-500">Upload image to animate</span>
                  </div>
                )}
              </button>
            </div>

            {/* Duration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Duration</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <Listbox value={selectedDuration} onChange={setSelectedDuration}>
                <div className="relative">
                  <Listbox.Button className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-neutral-800 rounded-lg text-left text-gray-600 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
                    {availableDurations.find(d => d.id === selectedDuration)?.name}
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-h-48 overflow-auto text-sm">
                    {availableDurations.map((duration) => (
                      <Listbox.Option
                        key={duration.id}
                        value={duration.id}
                        className={({ active }) =>
                          `${active ? 'bg-gray-100 dark:bg-neutral-700' : ''} cursor-pointer select-none relative py-2 px-4`
                        }
                      >
                        {duration.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              <p className="text-xs text-neutral-400">Note: 10 seconds videos are not supported for 1080p resolution</p>
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
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={promptOptimizer}
                        onChange={(e) => setPromptOptimizer(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-neutral-600 dark:text-neutral-400">Use Prompt Optimizer</span>
                    </label>
                    <p className="text-xs text-neutral-400">Automatically enhance your prompt for better results</p>
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
            {generatedVideoUrl ? (
              <video 
                src={generatedVideoUrl} 
                controls 
                className="max-h-[calc(100vh-20rem)] object-contain rounded-lg"
                autoPlay
                loop
              />
            ) : (
              <div className="text-center px-6 relative z-10">
                <div className="flex flex-col items-center mb-4">
                  <Wand2 className="w-12 h-12 mb-2 animate-gradient-x bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-110" />
                  <Play className="w-6 h-6 animate-gradient-x bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent" />
                </div>
                <h2 className="text-xl font-medium text-neutral-400 mb-2">Start creating videos</h2>
                <p className="text-sm text-neutral-400 max-w-lg mx-auto">
                  Upload an image and describe the motion or animation you want to see. The AI will bring your image to life with smooth, realistic video generation.
                </p>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto mb-2"></div>
                  <p className="text-neutral-300">Generating your video...</p>
                  <p className="text-xs text-neutral-400 mt-1">This may take a few minutes</p>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Area */}
          <div className="bg-white dark:bg-neutral-850 p-4 rounded-xl">
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium">Animation Prompt</h3>
                <Info className="w-4 h-4 text-neutral-400" />
              </div>
              <button 
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors group"
                onClick={() => {
                  console.log('Boosting prompt...');
                }}
              >
                <Zap className="w-4 h-4 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-sm">BOOST your animation prompt</span>
              </button>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-24 px-4 py-3 text-base bg-gray-100 dark:bg-neutral-800 rounded-xl resize-none"
                placeholder="Describe the motion or animation you want to see in your video..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !sourceImage || !promptText.trim()}
                className={`absolute right-4 bottom-4 px-5 py-2 text-base rounded-lg transition-colors ${
                  isLoading || !sourceImage || !promptText.trim()
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-sky-600 text-white hover:bg-sky-700'
                }`}
              >
                {isLoading ? 'Creating...' : 'Video It'}
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