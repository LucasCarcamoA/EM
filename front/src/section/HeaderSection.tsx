interface HeaderSectionProps {
  title: string;
}

export const HeaderSection = ({ title }: HeaderSectionProps) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
