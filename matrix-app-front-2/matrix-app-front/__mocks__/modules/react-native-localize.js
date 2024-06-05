jest.mock('react-native-localize', () => ({
    getLocales: () => [
        {
            languageTag: {
                toLowerCase: () => 'es-pe',
            },
        },
    ],
}));
