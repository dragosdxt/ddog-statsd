# ddog-statsd
A simple example of datadog client nodejs library integration

# StatsD based Metrics
Datadog extends the StatsD both client and server libraries to support additional features. More details about the differences can be found https://help.datadoghq.com/hc/en-us/articles/203761125-Can-I-use-my-own-StatsD-client-What-is-DogStatsD- and https://docs.datadoghq.com/developers/dogstatsd.

The Dogstatsd custom libraries support tags out-of-the-box and make the entire metrics sending / processing / charting process very ease to use and get started. However, the decision to use the custom library should not be taken lightly, as future migration / development requirements should be considered.

Getting started steps are available here: https://github.com/mrbar42/node-dogstatsd#readme
Once the client library is integrated in an application, the datadog agent must be configured to accept incoming data using StatsD protocol. That is usually made by editing `/etc/datadog-agent/datadog.yaml` and enabling `use_dogstatsd: true` and `dogstatsd_port: 8125`. Once the agent is restarted (`restart datadog-agent`) the integration is active and first metrics should be in a few minutes available in Datagod platform (https://app.datadoghq.com/metric/summary) 

Once desired metrics are available, they can be inspected observing the metric type, hosts, interval and tags reported.

Depending on the metrics purpose, usually charting them in an application-specific Dashboard is the next step. Simple charts are a few clicks away, but the entire charting / graphing process is a very powerful tool which offers many advanced possibilities, including metrics composing, aggregations and other, which are documented here https://docs.datadoghq.com/graphing.

In parallel with graphing a metric, a very important step is to create a metric monitor, which will make possible to use different notification channels (slack, mail, external apps) to alert specific users (or groups) of specific metric behaviour such as: values below / over thresholds, lack of incoming data, changes in metrics data, etc… More details are available here: https://docs.datadoghq.com/monitors.
