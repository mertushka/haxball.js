# WebRTC 0.2.3 transport benchmark

The benchmark ran on Windows 11 Pro x64 (build 26300), Node 24.16.0, npm 11.18.0, and a Ryzen 5 5600 with 12 logical CPUs and 16 GiB RAM. It used the generated ESM build with the default adapter, a local HTTP/WebSocket signaling service, and real native WebRTC between separate Node processes.

The one-peer workload sent 100 pairs of targeted and broadcast announcements with a 15 ms delay after each pair. The four-peer workload sent ten bursts of 128 announcements per player on each reliable channel, with a 120 ms delay after each burst. Each workload ran a half-length warmup followed by three recorded runs. Announcement sizes varied with UTF-8 payload lengths from 4 to 850 bytes of padding. Clients sent a timestamp probe about every 25 ms on the unordered, zero-retransmit channel while the game ran. Round-trip times are for those probes, which traverse the generated host's real ping handler.

The harness checks lengths and CRC-32 on transmitted and received announcements. It verifies sequence on the reliable ordered channel and compares the reliable unordered channel as a multiset. It counts matching unreliable packets in the observed capture and tracks ping replies separately. The delivery and ping rows sum the three runs. The other rows report the median of the three per-run statistics.

## One peer, paced

| Metric | 5.1.0 / 0.2.1 | Dependency only / 0.2.3 | 5.1.1 / 0.2.3 |
| --- | ---: | ---: | ---: |
| Send-loop p50 / p95 / p99 (ms) | 0.254 / 0.405 / 0.546 | 0.130 / 0.241 / 0.307 | 0.110 / 0.189 / 0.246 |
| Host event-loop delay p99 / max (ms) | 16.61 / 16.65 | 16.61 / 16.64 | 16.57 / 16.60 |
| Host game-tick gap p50 / p95 / p99 (ms) | 15.75 / 31.80 / 31.99 | 15.74 / 31.89 / 32.75 | 15.76 / 31.71 / 32.50 |
| Ping RTT p50 / p95 / p99 (ms) | 0.62 / 0.87 / 1.16 | 0.65 / 1.15 / 2.04 | 0.55 / 0.76 / 1.10 |
| Delivered announcement throughput (KiB/s) | 28.5 | 32.5 | 33.2 |
| Host CPU time per run (ms) | 109 | 125 | 0* |
| Host peak sampled RSS (MiB) | 71.2 | 71.9 | 71.2 |
| Peak sampled per-channel bufferedAmount (bytes) | 885 | 885 | 938 |
| Ordered / unordered reliable announcements delivered | 300/300 · 300/300 | 300/300 · 300/300 | 300/300 · 300/300 |
| Unreliable host sends received / attempted | 364/364 | 311/311 | 313/313 |
| Pings echoed / sent | 175/175 | 158/158 | 156/156 |

\* Several short Windows CPU samples registered zero. These measurements are too coarse to interpret at the paced load.

## Four peers, bursts

| Metric | 5.1.0 / 0.2.1 | Dependency only / 0.2.3 | 5.1.1 / 0.2.3 |
| --- | ---: | ---: | ---: |
| Send-loop p50 / p95 / p99 (ms) | 53.51 / 57.51 / 57.51 | 11.56 / 12.92 / 12.92 | 10.63 / 12.89 / 12.89 |
| Host event-loop delay p99 / max (ms) | 54.69 / 55.74 | 16.61 / 16.66 | 16.63 / 16.78 |
| Host game-tick gap p50 / p95 / p99 (ms) | 12.21 / 68.82 / 70.93 | 15.32 / 36.87 / 47.24 | 15.60 / 37.30 / 48.61 |
| Ping RTT p50 / p95 / p99 (ms) | 0.57 / 53.48 / 54.74 | 0.53 / 32.25 / 32.89 | 0.53 / 26.45 / 27.44 |
| Delivered announcement throughput (KiB/s) | 1,593 | 2,114 | 2,122 |
| Host CPU time per run (ms) | 921 | 687 | 765 |
| Host peak sampled RSS (MiB) | 89.1 | 88.1 | 88.9 |
| Peak sampled per-channel bufferedAmount (bytes) | 35,808 | 35,808 | 35,808 |
| Ordered / unordered reliable announcements delivered | 15,360/15,360 · 15,360/15,360 | 15,360/15,360 · 15,360/15,360 | 15,360/15,360 · 15,360/15,360 |
| Unreliable host sends received / attempted | 980/980 | 740/740 | 752/752 |
| Pings echoed / sent | 752/752 | 532/532 | 528/528 |

The dependency upgrade accounts for most of the measured reduction in four-peer send-loop time and event-loop delay. The send loop includes headless packet construction and instrumentation. Throughput includes the configured inter-burst delays, and the timer-driven tick gap includes headless's normal batching of ticks. The shorter burst runs give the ping timer fewer chances to fire. All recorded payload checks passed, and the observed unreliable loss applies only to this same-machine workload. The smaller timing differences between the dependency-only and final builds are sensitive to Windows timer scheduling and run-to-run variation.

## Reproduce

Run these commands from the release checkout in a POSIX shell (Git Bash works on Windows).

```sh
git worktree add --detach ../haxball-benchmark-baseline v5.1.0
cp scripts/benchmark-transport.mjs ../haxball-benchmark-baseline/scripts/
cp -R scripts/fixtures ../haxball-benchmark-baseline/scripts/
(
  cd ../haxball-benchmark-baseline &&
  npm ci &&
  npm run build &&
  node scripts/benchmark-transport.mjs > baseline.json &&
  npm install @webrtc-node/webrtc@0.2.3 &&
  npm run build &&
  node scripts/benchmark-transport.mjs > dependency-only.json
)
npm ci && npm run build && node scripts/benchmark-transport.mjs > release.json
```

The script writes environment information and the individual samples as JSON. The timing measurements are observational and can vary with system load. Upstream ran full Web Platform Tests in GitHub Actions. [WebRTC 0.2.3 conformance](https://github.com/webrtc-node/webrtc/actions/runs/44438942717)
