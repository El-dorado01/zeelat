import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StudentImageProps = {
        image: File | null;
    setData: (key: string, value: any) => void;
    errors: any;
};

export default function StudentImage({ image, setData, errors }: StudentImageProps) {
    return (
        <div className="space-y-6">
            <HeadingSmall title="Upload Image" description="Upload a nice full image not more than 2 MB" />
            <div className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="image" className="sr-only">
                        Image
                    </Label>

                    <Input
                        id="image"
                        type="file"
                        required
                        accept="image/*"
                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        className="mt-1 w-full"
                    />

                    <InputError message={errors.image} />
                </div>
            </div>
        </div>
    );
}
