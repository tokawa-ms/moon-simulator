/**
 * 月の満ち欠けシミュレーター
 * Three.jsを使用した3D可視化アプリケーション
 */

console.log('🚀 月の満ち欠けシミュレーター起動中...');

// グローバル変数
let mainScene, mainCamera, mainRenderer, mainControls;
let earthViewScene, earthViewCamera, earthViewRenderer;
let moonViewScene, moonViewCamera, moonViewRenderer;
let japanViewScene, japanViewCamera, japanViewRenderer;

let sun, earth, moon;
let earthOrbitLine, moonOrbitLine;
let isAnimating = false;
let animationId = null;

// 定数設定
const SCALE_FACTOR = 10; // スケールファクター（視覚的にわかりやすくするため）
const SUN_RADIUS = 3;
const EARTH_RADIUS = 1;
const MOON_RADIUS = 0.27;
const EARTH_ORBIT_RADIUS = 0; // 太陽を中心に固定
const MOON_ORBIT_RADIUS = 8; // 地球からの距離
const MOON_ORBITAL_PERIOD = 29.5; // 月の公転周期（日）

console.log('定数設定完了:', { SUN_RADIUS, EARTH_RADIUS, MOON_RADIUS, MOON_ORBIT_RADIUS });

/**
 * メインの3Dシーン初期化
 */
function initMainScene() {
    console.log('メイン3Dシーンを初期化中...');
    
    const container = document.getElementById('main-view');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // シーン作成
    mainScene = new THREE.Scene();
    mainScene.background = new THREE.Color(0x000000);
    console.log('シーン作成完了');

    // カメラ作成
    mainCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    mainCamera.position.set(0, 20, 30);
    mainCamera.lookAt(0, 0, 0);
    console.log('カメラ設定完了:', mainCamera.position);

    // レンダラー作成
    mainRenderer = new THREE.WebGLRenderer({ antialias: true });
    mainRenderer.setSize(width, height);
    container.appendChild(mainRenderer.domElement);
    console.log('レンダラー作成完了:', { width, height });

    // ライト追加
    const ambientLight = new THREE.AmbientLight(0x333333);
    mainScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(0, 0, 0);
    mainScene.add(pointLight);
    console.log('ライト追加完了');

    // マウスコントロール（簡易版）
    setupMouseControls(container, mainCamera);

    // 天体オブジェクト作成
    createCelestialBodies();
    
    // 軌道線作成
    createOrbits();

    console.log('メイン3Dシーン初期化完了');
}

/**
 * 天体オブジェクトの作成
 */
function createCelestialBodies() {
    console.log('天体オブジェクト作成中...');

    // 太陽
    const sunGeometry = new THREE.SphereGeometry(SUN_RADIUS, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.8
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    mainScene.add(sun);
    console.log('太陽作成完了:', sun.position);

    // 地球
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2233ff,
        emissive: 0x112244,
        shininess: 10
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(15, 0, 0);
    mainScene.add(earth);
    console.log('地球作成完了:', earth.position);

    // 月
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xaaaaaa,
        emissive: 0x222222,
        shininess: 5
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(earth.position.x + MOON_ORBIT_RADIUS, 0, 0);
    mainScene.add(moon);
    console.log('月作成完了:', moon.position);

    console.log('全天体オブジェクト作成完了');
}

/**
 * 軌道線の作成
 */
function createOrbits() {
    console.log('軌道線作成中...');

    // 地球の軌道（実際には太陽の周りを回らないが、視覚的に表示）
    const earthOrbitGeometry = new THREE.BufferGeometry();
    const earthOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        earthOrbitPoints.push(new THREE.Vector3(
            Math.cos(angle) * 15,
            0,
            Math.sin(angle) * 15
        ));
    }
    earthOrbitGeometry.setFromPoints(earthOrbitPoints);
    const earthOrbitMaterial = new THREE.LineBasicMaterial({ color: 0x4444ff, opacity: 0.3, transparent: true });
    earthOrbitLine = new THREE.Line(earthOrbitGeometry, earthOrbitMaterial);
    mainScene.add(earthOrbitLine);

    // 月の軌道
    const moonOrbitGeometry = new THREE.BufferGeometry();
    const moonOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        moonOrbitPoints.push(new THREE.Vector3(
            Math.cos(angle) * MOON_ORBIT_RADIUS,
            0,
            Math.sin(angle) * MOON_ORBIT_RADIUS
        ));
    }
    moonOrbitGeometry.setFromPoints(moonOrbitPoints);
    const moonOrbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888, opacity: 0.5, transparent: true });
    moonOrbitLine = new THREE.Line(moonOrbitGeometry, moonOrbitMaterial);
    moonOrbitLine.position.copy(earth.position);
    mainScene.add(moonOrbitLine);

    console.log('軌道線作成完了');
}

/**
 * 地球から見た月のビュー初期化
 */
function initEarthView() {
    console.log('地球視点ビュー初期化中...');
    
    const container = document.getElementById('earth-view');
    const width = container.clientWidth;
    const height = container.clientHeight;

    earthViewScene = new THREE.Scene();
    earthViewScene.background = new THREE.Color(0x000011);

    earthViewCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    earthViewCamera.position.set(0, 0, 5);

    earthViewRenderer = new THREE.WebGLRenderer({ antialias: true });
    earthViewRenderer.setSize(width, height);
    container.appendChild(earthViewRenderer.domElement);

    // ライト
    const ambientLight = new THREE.AmbientLight(0x404040);
    earthViewScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 0, 5);
    earthViewScene.add(directionalLight);

    console.log('地球視点ビュー初期化完了');
}

/**
 * 月から見た地球のビュー初期化
 */
function initMoonView() {
    console.log('月視点ビュー初期化中...');
    
    const container = document.getElementById('moon-view');
    const width = container.clientWidth;
    const height = container.clientHeight;

    moonViewScene = new THREE.Scene();
    moonViewScene.background = new THREE.Color(0x000011);

    moonViewCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    moonViewCamera.position.set(0, 0, 5);

    moonViewRenderer = new THREE.WebGLRenderer({ antialias: true });
    moonViewRenderer.setSize(width, height);
    container.appendChild(moonViewRenderer.domElement);

    // ライト
    const ambientLight = new THREE.AmbientLight(0x404040);
    moonViewScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 0, 5);
    moonViewScene.add(directionalLight);

    console.log('月視点ビュー初期化完了');
}

/**
 * 日本から見た月の形のビュー初期化
 */
function initJapanView() {
    console.log('日本視点ビュー初期化中...');
    
    const container = document.getElementById('japan-view');
    const width = container.clientWidth;
    const height = container.clientHeight;

    japanViewScene = new THREE.Scene();
    japanViewScene.background = new THREE.Color(0x000033);

    japanViewCamera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    japanViewCamera.position.set(0, 0, 10);

    japanViewRenderer = new THREE.WebGLRenderer({ antialias: true });
    japanViewRenderer.setSize(width, height);
    container.appendChild(japanViewRenderer.domElement);

    // ライト
    const ambientLight = new THREE.AmbientLight(0x202020);
    japanViewScene.add(ambientLight);

    console.log('日本視点ビュー初期化完了');
}

/**
 * 簡易マウスコントロール
 */
function setupMouseControls(container, camera) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraDistance = 30;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            const angle = Math.atan2(camera.position.z, camera.position.x);
            const newAngle = angle - deltaX * 0.01;
            
            camera.position.x = Math.cos(newAngle) * cameraDistance;
            camera.position.z = Math.sin(newAngle) * cameraDistance;
            camera.position.y = Math.max(5, Math.min(40, camera.position.y - deltaY * 0.1));
            
            camera.lookAt(0, 0, 0);
            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        cameraDistance = Math.max(10, Math.min(50, cameraDistance + e.deltaY * 0.01));
        const angle = Math.atan2(camera.position.z, camera.position.x);
        camera.position.x = Math.cos(angle) * cameraDistance;
        camera.position.z = Math.sin(angle) * cameraDistance;
    });
}

/**
 * 月の位置更新
 */
function updateMoonPosition(dayProgress) {
    console.log('月の位置更新:', dayProgress + '日');
    
    const angle = (dayProgress / MOON_ORBITAL_PERIOD) * Math.PI * 2;
    
    moon.position.x = earth.position.x + Math.cos(angle) * MOON_ORBIT_RADIUS;
    moon.position.z = earth.position.z + Math.sin(angle) * MOON_ORBIT_RADIUS;
    
    // 月の軌道線の位置も更新
    moonOrbitLine.position.copy(earth.position);
    
    console.log('月の新しい位置:', moon.position);
}

/**
 * 地球の自転更新
 */
function updateEarthRotation(hour) {
    console.log('地球の自転更新:', hour + '時');
    
    const angle = (hour / 24) * Math.PI * 2;
    earth.rotation.y = angle;
    
    console.log('地球の回転角度:', angle);
}

/**
 * 地球視点の月を更新
 */
function updateEarthViewMoon(dayProgress) {
    console.log('地球視点の月を更新中...');
    
    // 既存の月オブジェクトを削除
    earthViewScene.children = earthViewScene.children.filter(child => !(child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry));
    
    const angle = (dayProgress / MOON_ORBITAL_PERIOD) * Math.PI * 2;
    
    // 太陽の方向（左から）
    const sunDirection = new THREE.Vector3(-1, 0, 0);
    
    // 月のジオメトリ
    const moonGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({ 
        color: 0xcccccc,
        emissive: 0x111111,
        shininess: 5
    });
    const viewMoon = new THREE.Mesh(moonGeo, moonMat);
    viewMoon.position.set(0, 0, 0);
    
    // 月の向きを調整（太陽からの光の方向に基づく）
    viewMoon.rotation.y = angle + Math.PI;
    
    earthViewScene.add(viewMoon);
    
    // ライトの位置を太陽の方向に
    const lights = earthViewScene.children.filter(child => child instanceof THREE.DirectionalLight);
    if (lights.length > 0) {
        lights[0].position.set(Math.cos(angle + Math.PI) * 5, 0, Math.sin(angle + Math.PI) * 5);
    }
    
    console.log('地球視点の月更新完了');
}

/**
 * 月視点の地球を更新
 */
function updateMoonViewEarth(dayProgress) {
    console.log('月視点の地球を更新中...');
    
    // 既存の地球オブジェクトを削除
    moonViewScene.children = moonViewScene.children.filter(child => !(child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry));
    
    const angle = (dayProgress / MOON_ORBITAL_PERIOD) * Math.PI * 2;
    
    // 地球のジオメトリ
    const earthGeo = new THREE.SphereGeometry(2, 32, 32);
    const earthMat = new THREE.MeshPhongMaterial({ 
        color: 0x2233ff,
        emissive: 0x112244,
        shininess: 10
    });
    const viewEarth = new THREE.Mesh(earthGeo, earthMat);
    viewEarth.position.set(0, 0, 0);
    
    // 地球の向きを調整
    viewEarth.rotation.y = angle;
    
    moonViewScene.add(viewEarth);
    
    // ライトの位置を太陽の方向に
    const lights = moonViewScene.children.filter(child => child instanceof THREE.DirectionalLight);
    if (lights.length > 0) {
        lights[0].position.set(Math.cos(angle + Math.PI) * 5, 0, Math.sin(angle + Math.PI) * 5);
    }
    
    console.log('月視点の地球更新完了');
}

/**
 * 日本視点の月を更新
 */
function updateJapanViewMoon(dayProgress, hour) {
    console.log('日本視点の月を更新中:', { dayProgress, hour });
    
    // 既存の月オブジェクトを削除
    japanViewScene.children = japanViewScene.children.filter(child => !(child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry));
    
    const angle = (dayProgress / MOON_ORBITAL_PERIOD) * Math.PI * 2;
    
    // 月のジオメトリ
    const moonGeo = new THREE.SphereGeometry(2.5, 64, 64);
    const moonMat = new THREE.MeshPhongMaterial({ 
        color: 0xdddddd,
        emissive: 0x111111,
        shininess: 5
    });
    const viewMoon = new THREE.Mesh(moonGeo, moonMat);
    viewMoon.position.set(0, 0, 0);
    
    // 月の向きを調整
    viewMoon.rotation.y = angle + Math.PI;
    
    japanViewScene.add(viewMoon);
    
    // 太陽の方向からのライト
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(Math.cos(angle + Math.PI) * 10, 0, Math.sin(angle + Math.PI) * 10);
    japanViewScene.add(directionalLight);
    
    // 月の名前を更新
    updateMoonPhaseName(dayProgress);
    
    console.log('日本視点の月更新完了');
}

/**
 * 月の名前を更新
 */
function updateMoonPhaseName(dayProgress) {
    const phaseNames = [
        '新月', '三日月', '上弦の月', '十日夜の月', 
        '満月', '寝待月', '下弦の月', '有明月'
    ];
    
    const phaseIndex = Math.floor((dayProgress / MOON_ORBITAL_PERIOD) * 8) % 8;
    const phaseName = phaseNames[phaseIndex];
    
    document.getElementById('moon-phase-name').textContent = phaseName;
    console.log('月の相:', phaseName);
}

/**
 * レンダリングループ
 */
function animate() {
    requestAnimationFrame(animate);
    
    // メインシーンのレンダリング
    if (mainRenderer && mainScene && mainCamera) {
        mainRenderer.render(mainScene, mainCamera);
    }
    
    // サブビューのレンダリング
    if (earthViewRenderer && earthViewScene && earthViewCamera) {
        earthViewRenderer.render(earthViewScene, earthViewCamera);
    }
    
    if (moonViewRenderer && moonViewScene && moonViewCamera) {
        moonViewRenderer.render(moonViewScene, moonViewCamera);
    }
    
    if (japanViewRenderer && japanViewScene && japanViewCamera) {
        japanViewRenderer.render(japanViewScene, japanViewCamera);
    }
}

/**
 * UIイベント設定
 */
function setupUIEvents() {
    console.log('UIイベント設定中...');
    
    const orbitSlider = document.getElementById('orbit-slider');
    const rotationSlider = document.getElementById('rotation-slider');
    const currentDaySpan = document.getElementById('current-day');
    const currentHourSpan = document.getElementById('current-hour');
    const playBtn = document.getElementById('play-btn');
    const resetBtn = document.getElementById('reset-btn');

    // 月の公転スライダー
    orbitSlider.addEventListener('input', (e) => {
        const dayProgress = parseFloat(e.target.value) / 10;
        currentDaySpan.textContent = dayProgress.toFixed(1) + '日';
        updateMoonPosition(dayProgress);
        updateEarthViewMoon(dayProgress);
        updateMoonViewEarth(dayProgress);
        updateJapanViewMoon(dayProgress, parseFloat(rotationSlider.value));
        console.log('スライダー変更: 月の公転', dayProgress);
    });

    // 地球の自転スライダー
    rotationSlider.addEventListener('input', (e) => {
        const hour = parseFloat(e.target.value);
        currentHourSpan.textContent = hour.toFixed(1) + '時';
        updateEarthRotation(hour);
        updateJapanViewMoon(parseFloat(orbitSlider.value) / 10, hour);
        console.log('スライダー変更: 地球の自転', hour);
    });

    // 再生ボタン
    playBtn.addEventListener('click', () => {
        isAnimating = !isAnimating;
        playBtn.textContent = isAnimating ? '⏸ 停止' : '▶ 再生';
        
        if (isAnimating) {
            console.log('アニメーション開始');
            autoAnimate();
        } else {
            console.log('アニメーション停止');
            if (animationId) {
                clearInterval(animationId);
                animationId = null;
            }
        }
    });

    // リセットボタン
    resetBtn.addEventListener('click', () => {
        console.log('リセット実行');
        orbitSlider.value = 0;
        rotationSlider.value = 12;
        currentDaySpan.textContent = '0日';
        currentHourSpan.textContent = '12時';
        updateMoonPosition(0);
        updateEarthRotation(12);
        updateEarthViewMoon(0);
        updateMoonViewEarth(0);
        updateJapanViewMoon(0, 12);
        
        if (isAnimating) {
            isAnimating = false;
            playBtn.textContent = '▶ 再生';
            if (animationId) {
                clearInterval(animationId);
                animationId = null;
            }
        }
    });

    console.log('UIイベント設定完了');
}

/**
 * 自動アニメーション
 */
function autoAnimate() {
    const orbitSlider = document.getElementById('orbit-slider');
    const currentDaySpan = document.getElementById('current-day');
    const rotationSlider = document.getElementById('rotation-slider');
    
    animationId = setInterval(() => {
        if (!isAnimating) return;
        
        let currentValue = parseFloat(orbitSlider.value);
        currentValue += 1;
        
        if (currentValue > 295) {
            currentValue = 0;
        }
        
        orbitSlider.value = currentValue;
        const dayProgress = currentValue / 10;
        currentDaySpan.textContent = dayProgress.toFixed(1) + '日';
        
        updateMoonPosition(dayProgress);
        updateEarthViewMoon(dayProgress);
        updateMoonViewEarth(dayProgress);
        updateJapanViewMoon(dayProgress, parseFloat(rotationSlider.value));
    }, 100);
}

/**
 * ウィンドウリサイズ処理
 */
function handleResize() {
    console.log('ウィンドウリサイズ処理');
    
    // メインビュー
    const mainContainer = document.getElementById('main-view');
    if (mainContainer && mainCamera && mainRenderer) {
        const width = mainContainer.clientWidth;
        const height = mainContainer.clientHeight;
        mainCamera.aspect = width / height;
        mainCamera.updateProjectionMatrix();
        mainRenderer.setSize(width, height);
    }
    
    // 地球視点ビュー
    const earthContainer = document.getElementById('earth-view');
    if (earthContainer && earthViewCamera && earthViewRenderer) {
        const width = earthContainer.clientWidth;
        const height = earthContainer.clientHeight;
        earthViewCamera.aspect = width / height;
        earthViewCamera.updateProjectionMatrix();
        earthViewRenderer.setSize(width, height);
    }
    
    // 月視点ビュー
    const moonContainer = document.getElementById('moon-view');
    if (moonContainer && moonViewCamera && moonViewRenderer) {
        const width = moonContainer.clientWidth;
        const height = moonContainer.clientHeight;
        moonViewCamera.aspect = width / height;
        moonViewCamera.updateProjectionMatrix();
        moonViewRenderer.setSize(width, height);
    }
    
    // 日本視点ビュー
    const japanContainer = document.getElementById('japan-view');
    if (japanContainer && japanViewCamera && japanViewRenderer) {
        const width = japanContainer.clientWidth;
        const height = japanContainer.clientHeight;
        japanViewCamera.aspect = width / height;
        japanViewCamera.updateProjectionMatrix();
        japanViewRenderer.setSize(width, height);
    }
}

/**
 * 初期化
 */
function init() {
    console.log('=== アプリケーション初期化開始 ===');
    
    try {
        // 各ビューの初期化
        initMainScene();
        initEarthView();
        initMoonView();
        initJapanView();
        
        // 初期状態の設定
        updateMoonPosition(0);
        updateEarthRotation(12);
        updateEarthViewMoon(0);
        updateMoonViewEarth(0);
        updateJapanViewMoon(0, 12);
        
        // UIイベント設定
        setupUIEvents();
        
        // アニメーション開始
        animate();
        
        // リサイズイベント
        window.addEventListener('resize', handleResize);
        
        console.log('=== アプリケーション初期化完了 ===');
        console.log('✅ すべての機能が正常に動作しています');
    } catch (error) {
        console.error('❌ 初期化エラー:', error);
    }
}

// DOMロード完了後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
