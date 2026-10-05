import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Faithful React port of the template's "logo bowl" physics canvas.
// 18 monochrome tech-icon balls drop into a bowl; the active tab in `LIT`
// determines which ones light up. Honours prefers-reduced-motion and pauses
// when the banner leaves the viewport.

const TYPES = ['py', 'js', 'pg', 'el', 'rs', 'xl', 'dbt', 're', 'ts', 'dk', 'ml', 'sh', 'rd', 'mq', 'dj', 'fa', 'ex', 'nd'];
const LIT = {
    featured: [],
    web: ['js', 'ts', 're', 'nd', 'ex', 'dj', 'fa', 'dk'],
};

function geo(W, H) { return { cx: W / 2, floor: H - 72 }; }

function makeWorld(M, W, H, R) {
    const g = geo(W, H);
    const eng = M.Engine.create({ enableSleeping: true });
    const T = 60;
    const sp = Math.min(W * 0.3, 320);
    M.Composite.add(eng.world, [
        M.Bodies.rectangle(W / 2, g.floor + T / 2, W + T * 4, T, { isStatic: true }),
        M.Bodies.rectangle(-T / 2, g.floor - 300, T, 900, { isStatic: true }),
        M.Bodies.rectangle(W + T / 2, g.floor - 300, T, 900, { isStatic: true }),
    ]);
    return {
        eng, g,
        spawn(k, pre) {
            const x = g.cx + (Math.random() - 0.5) * 2 * sp;
            const y = pre ? -R * 2 - k * R * 2.3 : -R * 2;
            const b = M.Bodies.circle(x, y, R, { restitution: 0.4, friction: 0.1, frictionAir: 0.01, density: 0.002 });
            M.Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.2);
            M.Composite.add(eng.world, b);
            return b;
        },
    };
}

function LogoBowl({ activeTab }) {
    const bannerRef = useRef(null);
    const canvasRef = useRef(null);
    const activeTabRef = useRef(activeTab);

    useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

    useEffect(() => {
        const M = Matter;
        const banner = bannerRef.current;
        const cv = canvasRef.current;
        if (!banner || !cv) return undefined;
        const ctx = cv.getContext('2d');

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const C = {};
        let balls = [];
        let world = null;
        let W = 0, H = 0, R = 26;
        let frame = 0;
        let looping = false;
        let visible = true;
        let geoNow = null;
        let cancelled = false;

        function updateColors() {
            const st = getComputedStyle(document.documentElement);
            ['--ink', '--mut', '--surf', '--line', '--acc', '--land'].forEach((k) => {
                C[k] = st.getPropertyValue(k).trim();
            });
        }
        function rgb(h) {
            h = h.replace('#', '');
            if (h.length === 3) h = h.replace(/./g, '$&$&');
            return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
        }
        function mix(a, b, t) {
            const x = rgb(a), y = rgb(b);
            return 'rgb(' + x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',') + ')';
        }
        function rr(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }
        function fontSet(u) {
            ctx.font = '700 ' + u + "px 'Instrument Sans', system-ui, sans-serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        }
        function sq(x, y, w, h, r) { rr(x, y, w, h, r); ctx.fill(); }
        function tx(t, u, y) { fontSet(u); ctx.fillText(t, 0, y || 0); }

        // Simplified monochrome marks (not official artwork). Mirrors the
        // template's icon() 1:1, using closure state via ctx.
        function icon(t, u, col, bg) {
            ctx.save();
            ctx.fillStyle = col;
            ctx.strokeStyle = col;
            ctx.lineWidth = Math.max(1.5, u * 0.12);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            if (t === 're') {
                [0, 60, 120].forEach((d) => {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, u, u * 0.4, d * Math.PI / 180, 0, 7);
                    ctx.stroke();
                });
                ctx.beginPath(); ctx.arc(0, 0, u * 0.14, 0, 7); ctx.fill();
            } else if (t === 'el') {
                [45, -45].forEach((d) => {
                    ctx.beginPath();
                    ctx.ellipse(0, 0, u, u * 0.38, d * Math.PI / 180, 0, 7);
                    ctx.stroke();
                });
                ctx.beginPath(); ctx.arc(0, 0, u * 0.16, 0, 7); ctx.fill();
                [[0.7, -0.7], [-0.7, 0.7]].forEach((p) => {
                    ctx.beginPath(); ctx.arc(p[0] * u, p[1] * u, u * 0.12, 0, 7); ctx.fill();
                });
            } else if (t === 'js' || t === 'ts') {
                sq(-u * 0.8, -u * 0.8, u * 1.6, u * 1.6, u * 0.18);
                ctx.fillStyle = bg; tx(t === 'js' ? 'JS' : 'TS', u * 0.85, u * 0.06);
            } else if (t === 'xl') {
                sq(-u * 0.8, -u * 0.8, u * 1.6, u * 1.6, u * 0.2);
                ctx.fillStyle = bg; tx('X', u * 1.05, u * 0.05);
            } else if (t === 'dj') {
                sq(-u * 0.8, -u * 0.8, u * 1.6, u * 1.6, u * 0.2);
                ctx.fillStyle = bg; tx('dj', u * 0.9, u * 0.04);
            } else if (t === 'dbt') { tx('dbt', u * 0.95, u * 0.04); }
            else if (t === 'ex') { tx('ex', u * 1.15, u * 0.02); }
            else if (t === 'py') {
                sq(-u * 0.9, -u * 0.9, u * 1.1, u * 0.9, u * 0.3);
                sq(-u * 0.2, 0, u * 1.1, u * 0.9, u * 0.3);
                ctx.fillStyle = bg;
                [[-0.5, -0.55], [0.5, 0.55]].forEach((p) => {
                    ctx.beginPath(); ctx.arc(p[0] * u, p[1] * u, u * 0.1, 0, 7); ctx.fill();
                });
            } else if (t === 'pg') {
                ctx.beginPath();
                ctx.ellipse(0, -u * 0.55, u * 0.7, u * 0.25, 0, 0, 7);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-u * 0.7, -u * 0.55);
                ctx.lineTo(-u * 0.7, u * 0.55);
                ctx.moveTo(u * 0.7, -u * 0.55);
                ctx.lineTo(u * 0.7, u * 0.55);
                ctx.stroke();
                [0, 0.55].forEach((y) => {
                    ctx.beginPath();
                    ctx.ellipse(0, u * y, u * 0.7, u * 0.25, 0, 0, Math.PI);
                    ctx.stroke();
                });
            } else if (t === 'rs') {
                ctx.beginPath();
                ctx.arc(0, 0, u * 0.62, 0, 7);
                ctx.stroke();
                ctx.lineWidth = u * 0.22;
                for (let i = 0; i < 8; i++) {
                    const a = i * Math.PI / 4;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a) * u * 0.62, Math.sin(a) * u * 0.62);
                    ctx.lineTo(Math.cos(a) * u * 0.95, Math.sin(a) * u * 0.95);
                    ctx.stroke();
                }
                tx('R', u * 0.8, u * 0.05);
            } else if (t === 'nd') {
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const a = Math.PI / 6 + i * Math.PI / 3;
                    ctx.lineTo(Math.cos(a) * u, Math.sin(a) * u);
                }
                ctx.closePath();
                ctx.stroke();
                tx('N', u * 0.8, u * 0.05);
            } else if (t === 'fa') {
                ctx.beginPath();
                ctx.moveTo(u * 0.25, -u);
                ctx.lineTo(-u * 0.6, u * 0.15);
                ctx.lineTo(-u * 0.05, u * 0.15);
                ctx.lineTo(-u * 0.25, u);
                ctx.lineTo(u * 0.6, -u * 0.15);
                ctx.lineTo(u * 0.05, -u * 0.15);
                ctx.closePath();
                ctx.fill();
            } else if (t === 'dk') {
                const k = u * 0.38;
                for (let i = 0; i < 4; i++) sq(-u * 0.85 + i * (k + u * 0.05), u * 0.05, k, k, k * 0.15);
                for (let i = 0; i < 3; i++) sq(-u * 0.85 + k * 0.5 + i * (k + u * 0.05), u * 0.05 - k - u * 0.05, k, k, k * 0.15);
                sq(-u * 0.85 + k * 0.5 + (k + u * 0.05), u * 0.05 - 2 * (k + u * 0.05), k, k, k * 0.15);
                ctx.beginPath();
                ctx.arc(0, -u * 0.1, u * 0.95, 0.15 * Math.PI, 0.85 * Math.PI);
                ctx.stroke();
            } else if (t === 'ml') {
                const L = [[[-0.75, -0.45], [-0.75, 0.45]], [[0, -0.7], [0, 0], [0, 0.7]], [[0.75, 0]]];
                ctx.lineWidth = u * 0.07;
                L[0].forEach((p) => {
                    L[1].forEach((q) => {
                        ctx.beginPath();
                        ctx.moveTo(p[0] * u, p[1] * u);
                        ctx.lineTo(q[0] * u, q[1] * u);
                        ctx.stroke();
                    });
                });
                L[1].forEach((q) => {
                    ctx.beginPath();
                    ctx.moveTo(q[0] * u, q[1] * u);
                    ctx.lineTo(L[2][0][0] * u, 0);
                    ctx.stroke();
                });
                L.forEach((l) => {
                    l.forEach((p) => {
                        ctx.beginPath();
                        ctx.arc(p[0] * u, p[1] * u, u * 0.2, 0, 7);
                        ctx.fill();
                    });
                });
            } else if (t === 'sh') {
                rr(-u * 0.95, -u * 0.7, u * 1.9, u * 1.4, u * 0.2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-u * 0.5, -u * 0.25);
                ctx.lineTo(-u * 0.1, u * 0.05);
                ctx.lineTo(-u * 0.5, u * 0.35);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(u * 0.05, u * 0.38);
                ctx.lineTo(u * 0.5, u * 0.38);
                ctx.stroke();
            } else if (t === 'rd') {
                for (let i = 0; i < 3; i++) {
                    const y = -u * 0.5 + i * u * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(0, y - u * 0.3);
                    ctx.lineTo(u * 0.9, y);
                    ctx.lineTo(0, y + u * 0.3);
                    ctx.lineTo(-u * 0.9, y);
                    ctx.closePath();
                    ctx.stroke();
                }
            } else if (t === 'mq') {
                sq(-u * 0.6, -u * 0.1, u * 1.2, u * 1, u * 0.15);
                sq(-u * 0.5, -u * 0.95, u * 0.32, u * 0.8, u * 0.15);
                sq(u * 0.18, -u * 0.95, u * 0.32, u * 0.8, u * 0.15);
                ctx.fillStyle = bg;
                ctx.beginPath();
                ctx.arc(-u * 0.22, u * 0.25, u * 0.08, 0, 7);
                ctx.arc(u * 0.22, u * 0.25, u * 0.08, 0, 7);
                ctx.fill();
            }
            ctx.restore();
        }

        function draw() {
            if (!W) return;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = mix(C['--line'], C['--mut'], 0.35);
            ctx.fillRect(0, geoNow.floor, W, 1.5);
            balls.forEach((b) => {
                const target = b.lit ? 1 : 0;
                b.g += (target - b.g) * (reduce ? 1 : 0.12);
                const x = b.body ? b.body.position.x : b.x;
                const y = b.body ? b.body.position.y : b.y;
                const a = b.body ? b.body.angle : 0;
                const r = R * (1 + 0.08 * b.g);
                ctx.save();
                ctx.translate(x, y);
                if (b.g > 0.02) {
                    ctx.shadowColor = C['--acc'];
                    ctx.shadowBlur = 24 * b.g;
                }
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, 7);
                ctx.fillStyle = mix(C['--surf'], C['--acc'], 0.14 * b.g);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.lineWidth = 1.5 + b.g;
                ctx.strokeStyle = mix(C['--line'], C['--acc'], b.g);
                ctx.stroke();
                ctx.rotate(a);
                icon(b.t, r * 0.55, mix(C['--mut'], C['--acc'], b.g), mix(C['--surf'], C['--acc'], 0.14 * b.g));
                ctx.restore();
            });
        }

        function build(pre) {
            const r = banner.getBoundingClientRect();
            W = r.width;
            H = r.height;
            if (!W) return;
            const d = Math.min(window.devicePixelRatio || 1, 2);
            cv.width = W * d;
            cv.height = H * d;
            ctx.setTransform(d, 0, 0, d, 0, 0);
            R = W < 560 ? 17 : (W < 900 ? 24 : 27);
            updateColors();
            geoNow = geo(W, H);
            balls = [];
            world = null;
            frame = 0;
            const active = activeTabRef.current;
            const lit = (LIT[active] || []);
            if (!M) {
                const g = geoNow, yb = g.floor;
                TYPES.forEach((t, i) => {
                    const row = i < 5 ? 0 : (i < 9 ? 1 : 2);
                    const n = row === 0 ? 5 : (row === 1 ? 4 : 1);
                    const k = row === 0 ? i : (row === 1 ? i - 5 : 0);
                    balls.push({ t, x: g.cx + (k - (n - 1) / 2) * R * 2.1, y: yb - R * (1 + row * 1.7), g: 0, lit: lit.indexOf(t) > -1 });
                });
                draw();
                return;
            }
            world = makeWorld(M, W, H, R);
            world.queue = 0;
            TYPES.forEach((t) => balls.push({ t, body: null, g: 0, lit: lit.indexOf(t) > -1 }));
            if (pre || reduce) {
                balls.forEach((b, i) => { b.body = world.spawn(i, true); });
                for (let i = 0; i < 700; i++) M.Engine.update(world.eng, 1000 / 60);
                balls.forEach((b) => { b.g = b.lit ? 1 : 0; });
                world.queue = balls.length;
            }
        }

        function tick() {
            if (cancelled) return;
            if (!visible || document.hidden || reduce || !world) { looping = false; return; }
            frame++;
            if (frame % 30 === 0) updateColors();
            if (world.queue < balls.length && frame % 12 === 0) {
                balls[world.queue].body = world.spawn(world.queue, false);
                world.queue++;
            }
            M.Engine.update(world.eng, 1000 / 60);
            balls.forEach((b) => {
                if (b.body && b.body.position.y > H + 80) {
                    M.Body.setPosition(b.body, { x: geoNow.cx, y: -R * 2 });
                    M.Body.setVelocity(b.body, { x: 0, y: 0 });
                }
            });
            const live = balls.filter((b) => b.body);
            const save = balls;
            balls = live;
            draw();
            balls = save;
            requestAnimationFrame(tick);
        }

        function start() {
            if (!looping && !reduce) {
                looping = true;
                requestAnimationFrame(tick);
            }
        }

        function setLit(id) {
            const changed = id !== activeTabRef.current;
            activeTabRef.current = id;
            const l = LIT[id] || [];
            balls.forEach((b) => {
                b.lit = l.indexOf(b.t) > -1;
                if (changed && b.lit && b.body && !reduce) {
                    M.Sleeping.set(b.body, false);
                    M.Body.setVelocity(b.body, { x: (Math.random() - 0.5) * 2, y: -4.5 });
                }
            });
            if (reduce || !world) draw();
        }

        // External API exposed to the App: re-lights balls when activeTab changes.
        // We can't easily call a method on the component, so we use a ref-callback
        // trick: store setLit on the canvas dataset.
        cv.dataset.litReady = '1';
        cv._setLit = setLit;

        build(false);
        start();

        let resizeTimer;
        const resizeObserver = ('ResizeObserver' in window)
            ? new ResizeObserver(() => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const w = banner.getBoundingClientRect().width;
                    if (Math.abs(w - W) > 2) { build(true); start(); }
                }, 200);
            })
            : null;
        if (resizeObserver) resizeObserver.observe(banner);

        let intersectionObserver = null;
        if ('IntersectionObserver' in window) {
            intersectionObserver = new IntersectionObserver((entries) => {
                visible = entries[0].isIntersecting;
                if (visible) start();
            });
            intersectionObserver.observe(banner);
        }

        const onVisibility = () => start();
        document.addEventListener('visibilitychange', onVisibility);

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const onScheme = () => { updateColors(); draw(); };
        prefersDark.addEventListener('change', onScheme);

        return () => {
            cancelled = true;
            looping = false;
            document.removeEventListener('visibilitychange', onVisibility);
            prefersDark.removeEventListener('change', onScheme);
            if (resizeObserver) resizeObserver.disconnect();
            if (intersectionObserver) intersectionObserver.disconnect();
            if (world) {
                try { Matter.Composite.clear(world.eng.world, false, true); } catch (_) { /* ignore */ }
            }
        };
    }, []);

    // When activeTab changes from the App, call back into the canvas ref to
    // re-light matching balls.
    useEffect(() => {
        const cv = canvasRef.current;
        if (cv && cv._setLit) cv._setLit(activeTab);
    }, [activeTab]);

    return (
        <div className="banner" id="banner" ref={bannerRef} aria-hidden="true">
            <canvas id="bowl" ref={canvasRef} />
        </div>
    );
}

export default LogoBowl;
