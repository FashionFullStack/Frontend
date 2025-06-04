import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  selectMeasurements,
  selectIsProfileLoading,
  selectProfileError,
  updateMeasurements,
  uploadAvatar,
} from '@/features/profile/profileSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MeasurementsFormData {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
}

export default function ProfileCompletion() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const measurements = useSelector(selectMeasurements);
  const isLoading = useSelector(selectIsProfileLoading);
  const error = useSelector(selectProfileError);

  const [step, setStep] = useState(1);
  const [measurementsData, setMeasurementsData] = useState<MeasurementsFormData>({
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hips: 0,
    inseam: 0,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleMeasurementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurementsData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMeasurementsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateMeasurements(measurementsData)).unwrap();
      setStep(2);
    } catch (err) {
      toast.error('Failed to save measurements');
    }
  };

  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarFile) {
      toast.error('Please select an avatar image');
      return;
    }

    try {
      await dispatch(uploadAvatar(avatarFile)).unwrap();
      toast.success('Profile completed successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to upload avatar');
    }
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleMeasurementsSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={measurementsData.height || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={measurementsData.weight || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (cm)</Label>
                    <Input
                      id="chest"
                      name="chest"
                      type="number"
                      value={measurementsData.chest || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <Input
                      id="waist"
                      name="waist"
                      type="number"
                      value={measurementsData.waist || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (cm)</Label>
                    <Input
                      id="hips"
                      name="hips"
                      type="number"
                      value={measurementsData.hips || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inseam">Inseam (cm)</Label>
                    <Input
                      id="inseam"
                      name="inseam"
                      type="number"
                      value={measurementsData.inseam || ''}
                      onChange={handleMeasurementsChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Next'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleAvatarSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Upload Avatar</Label>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Complete Profile'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 