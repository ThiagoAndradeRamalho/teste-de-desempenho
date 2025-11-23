import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 200 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 1000 },
  ],
  thresholds: {
    'http_req_failed': ['rate < 0.01'],
    'http_req_duration': ['p(95) < 500']
  },
};

export default function () {
  const res = http.post('http://localhost:3000/checkout/crypto');
  check(res, {
    'is status  201': (r) => r.status === 201,
  });
}
