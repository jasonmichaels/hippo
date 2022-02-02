import { mockPostA, mockPostB } from './dummyData';

jest.mock('./hooks/useAxios.ts', () => {
  return jest.fn(() => ({
    result: { [mockPostA.author.id]: mockPostA, [mockPostB.author.id]: mockPostB },
    error: null,
    isLoading: false
  }))
});

const mockedNavigate = jest.fn();
const mockedSetParams = jest.fn();

jest.mock('@react-navigation/native', () => {
  const navigation = jest.requireActual('@react-navigation/native');
  return {
    ...navigation,
    setParms: mockedSetParams,
    useIsFocused: () => true,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
