import Image from 'next/image';

export default function WaveDivider({ invert = false }: { invert?: boolean }) {
  const svg = '/waves/smh-wave-mask.svg';
  return (
    <div className={`relative w-full ${invert ? 'rotate-180' : ''}`} aria-hidden="true">
      <Image
        src={svg}
        alt=""
        width={1920}
        height={300}
        className="h-auto w-full opacity-80"
        priority={false}
      />
    </div>
  );
}
