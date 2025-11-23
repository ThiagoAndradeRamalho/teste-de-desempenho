import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    'http_req_failed': ['rate == 0']
  },
};

export default function () {
  const res = http.get('http://localhost:3000/health');
  check(res, {
    'is status  200': (r) => r.status === 200,
  });
}
