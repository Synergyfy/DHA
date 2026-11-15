import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { ScreenHeader } from '../../design/ScreenHeader';
import { Icon } from '../../design/Primitives';

interface PlaceholderScreenProps {
  title: string;
  description: string;
}

/**
 * Honest placeholder for routes whose screens arrive in a later set
 * (Section 1 registration/login) or that do not exist.
 * It keeps navigation working without faking an unimplemented experience.
 *
 * Desktop: the card is centred in the remaining viewport instead of sitting
 * directly under the header on a wide, otherwise empty page.
 */
export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col bg-surface pb-safe">
      <ScreenHeader title={title} />

      <main className="mx-auto flex w-full max-w-reading flex-1 flex-col justify-center px-gutter pb-space-xl pt-header md:px-gutter-tablet">
        <div className="flex flex-col items-center gap-space-md rounded-xl bg-surface-container-low p-space-lg text-center shadow-sm md:p-space-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
            <Icon name="construction" className="text-[28px]" />
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
            <p className="mt-space-2xs font-body-md text-body-md text-on-surface-variant">
              {description}
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col gap-space-xs">
            <Button onClick={() => navigate('/')}>Back to Welcome</Button>
            <Button variant="neutral" onClick={() => navigate('/onboarding/get-started')}>
              Return to Onboarding
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
