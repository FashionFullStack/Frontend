import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

function Model({ customizations }: { customizations: any }) {
  const { scene } = useGLTF('/models/avatar.glb');
  return <primitive object={scene} />;
}

const customizationOptions = {
  skinTone: [
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'dark', label: 'Dark' },
  ],
  hairStyle: [
    { value: 'short', label: 'Short' },
    { value: 'long', label: 'Long' },
    { value: 'curly', label: 'Curly' },
  ],
  bodyType: [
    { value: 'slim', label: 'Slim' },
    { value: 'average', label: 'Average' },
    { value: 'athletic', label: 'Athletic' },
  ],
};

export default function AvatarCreator() {
  const [customizations, setCustomizations] = useState({
    skinTone: 'medium',
    hairStyle: 'short',
    bodyType: 'average',
    height: 170,
  });

  const handleCustomizationChange = (key: string, value: string | number) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-8 p-8">
      {/* 3D Viewer */}
      <div className="flex-1 min-h-[500px] lg:min-h-screen rounded-xl overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <Canvas camera={{ position: [0, 1.5, 3] }}>
          <Suspense fallback={null}>
            <PresentationControls
              global
              zoom={0.8}
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Model customizations={customizations} />
            </PresentationControls>
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Customization Panel */}
      <Card className="lg:w-96">
        <CardHeader>
          <CardTitle>Customize Your Avatar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skin Tone */}
          <div className="space-y-2">
            <Label>Skin Tone</Label>
            <Select
              value={customizations.skinTone}
              onValueChange={(value) => handleCustomizationChange('skinTone', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select skin tone" />
              </SelectTrigger>
              <SelectContent>
                {customizationOptions.skinTone.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hair Style */}
          <div className="space-y-2">
            <Label>Hair Style</Label>
            <Select
              value={customizations.hairStyle}
              onValueChange={(value) => handleCustomizationChange('hairStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select hair style" />
              </SelectTrigger>
              <SelectContent>
                {customizationOptions.hairStyle.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select
              value={customizations.bodyType}
              onValueChange={(value) => handleCustomizationChange('bodyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                {customizationOptions.bodyType.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label>Height (cm): {customizations.height}</Label>
            <Slider
              value={[customizations.height]}
              min={150}
              max={200}
              step={1}
              onValueChange={([value]) => handleCustomizationChange('height', value)}
            />
          </div>

          <div className="pt-4 space-y-2">
            <Button className="w-full" size="lg">
              Save Avatar
            </Button>
            <Button className="w-full" variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 