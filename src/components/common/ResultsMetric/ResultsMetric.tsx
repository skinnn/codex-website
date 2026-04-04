import type { ResultItem } from '@/types'
import './ResultsMetric.css'

interface ResultsMetricProps {
  result: ResultItem
}

export default function ResultsMetric({ result }: ResultsMetricProps) {
  return (
    <div className="results-metric">
      <p className="results-metric__value gradient-text">{result.value}</p>
      <p className="results-metric__label">{result.metric}</p>
      <p className="results-metric__desc">{result.description}</p>
    </div>
  )
}
