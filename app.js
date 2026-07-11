const { createApp, ref, computed, watch } = Vue; // 確保這裡引入了 watch

createApp({
    setup() {
        // --- 狀態管理 ---
        const currentTab = ref('itinerary');
        const selectedDay = ref(1);
        const days = [
            { id: 1, weekday: '日', date: '13' },
            { id: 2, weekday: '一', date: '14' }
        ];

        // --- 記帳邏輯 ---
        const exchangeIdr = ref(0);
        const computedTwd = computed(() => (exchangeIdr.value * 0.00215).toFixed(2));

        // --- 翻譯邏輯 ---
        const translateInput = ref('');
        const activeTranslations = ref([]);
        const dictionary = [
            { chn: '謝謝', ind: 'Terima kasih', pron: '得里瑪 嘎西' },
            { chn: '多少錢', ind: 'Berapa harganya', pron: '布拉巴 哈爾加尼亞' }
        ];

        // 監聽輸入變化，自動更新搜尋結果
        watch(translateInput, (newValue) => {
            if (!newValue) {
                activeTranslations.value = [];
            } else {
                activeTranslations.value = dictionary.filter(item => 
                    item.chn.includes(newValue) || item.ind.toLowerCase().includes(newValue.toLowerCase())
                );
            }
        });

        const shareApp = () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => alert('手帳連結已複製！'));
        };

        return { 
            currentTab, selectedDay, days, exchangeIdr, computedTwd, 
            translateInput, activeTranslations, shareApp 
        };
    }
}).mount('#app');
