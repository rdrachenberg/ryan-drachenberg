import  ThemeProvider from '@/components/ThemeProvider';
import Header from './Header';

export default function SharedLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <div className='fixed inset-0 flex justify-center sm:px-8'>
            <div className='flex w-full max-w-7xl lg:px-8'>
                <div className='w-full bg-gray-100 shadow ring-2 ring-black dark:bg-gray-900 dark:ring-blue-500'>
                </div>
            </div>
        </div>
        <div className='relative flex flex-col w-full'>
            <Header />
            <div className='relative sm:px-12 mt-20 sm:mt-32 mx-auto max-w-2xl lg:max-w-4xl px-4'>
                {children}
            </div>
        </div>
        
      </ThemeProvider>
    );
  }