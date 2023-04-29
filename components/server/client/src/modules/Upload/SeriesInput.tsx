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
  handleSeriesChange: (event: SelectChangeEvent<number>) => void;
  series: MiniBrandSeries[];
}

const SeriesInput = (props: Props) => {
  const { seriesId, handleSeriesChange, series } = props;
  return (
    <FormControl fullWidth style={container}>
      <InputLabel id="series-select-input">Series</InputLabel>
      <Select
        labelId="series-select-input"
        id="series-select"
        value={seriesId}
        label="Series"
        onChange={handleSeriesChange}
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
