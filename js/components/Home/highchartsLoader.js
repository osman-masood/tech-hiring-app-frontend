/**
 * Created by osman on 2/19/17.
 */
import ReactHighcharts from 'react-highcharts/dist/bundle/ReactHighcharts';
import HighchartsMore from 'highcharts-more';
import SolidGauge from 'highcharts-solid-gauge';

HighchartsMore(ReactHighcharts.Highcharts);
SolidGauge(ReactHighcharts.Highcharts);

export default ReactHighcharts;
