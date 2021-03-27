import Typography from 'components/atoms/NedoTypography';

export default function StoragePage(): JSX.Element {
  return (
    <div>
      <Typography variant="huge">Huge</Typography>
      <Typography variant="heading-1">heading 1</Typography>
      <Typography variant="text-small-bold">heading 2</Typography>
      <Typography color="green" variant="heading-2">
        heading 2
      </Typography>
    </div>
  );
}
