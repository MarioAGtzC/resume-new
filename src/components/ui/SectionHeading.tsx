import ApiLabel, { type ApiLabelProps } from './ApiLabel';

interface SectionHeadingProps {
  id: string;
  title: string;
  api: Omit<ApiLabelProps, 'variant'>;
}

function SectionHeading({ id, title, api }: SectionHeadingProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <ApiLabel {...api} variant='inline' />
      <h2 id={id} className='text-[32px] font-semibold tracking-[-0.02em]'>
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;
