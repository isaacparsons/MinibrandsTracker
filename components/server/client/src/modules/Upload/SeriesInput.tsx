import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

import { MiniBrandSeries } from '../../__generated__/graphql';

interface Props {
  seriesId?: number;
  handleSeriesChange: (seriesId: number) => void;
  series: MiniBrandSeries[];
}

const SeriesInput = (props: Props) => {
  const { seriesId, handleSeriesChange, series } = props;

  const onChangeSeries = (event: SelectChangeEvent<number>) => {
    handleSeriesChange(event.target.value as number);
  };

  return (
    <FormControl fullWidth style={container}>
      <InputLabel id="series-select-input">Series</InputLabel>
      <Select
        labelId="series-select-input"
        id="series-select"
        value={seriesId ?? ''}
        label="Series"
        onChange={onChangeSeries}
      >
        {series.map((_series) => (
          <MenuItem value={_series.id}>{_series.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const container = {
  marginTop: 10,
  marginBottom: 10
};

export default SeriesInput;
