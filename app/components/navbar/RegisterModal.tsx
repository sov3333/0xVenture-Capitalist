import { signIn } from 'next-auth/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle } from 'react-icons/fc';

const RegisterModal = ({ children }: { children: React.ReactNode }) => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            {children}
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-20" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-30">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Welcome to 0xVenture Capitalist
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    Sign in or create an account to get started!
                </Dialog.Description>
                <button
                    onClick={() => signIn('google')}
                    className="bg-white border text-black hover:bg-gray-100 hover:border-gray-400 hover:shadow-md inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none w-full text-sm"
                >
                    <div className="absolute left-10">
                        <FcGoogle />
                    </div>
                    Continue with Google
                </button>
                <button
                    onClick={() => signIn('twitter')}
                    className="bg-white border text-black hover:bg-gray-100 hover:border-gray-400 hover:shadow-md inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none w-full text-sm mt-[1rem]"
                >
                    <div className="absolute left-10">
                        <TwitterLogoIcon />
                    </div>
                    Continue with Twitter
                </button>
                <button
                    onClick={() => signIn('github')}
                    className="bg-white border text-black hover:bg-gray-100 hover:border-gray-400 hover:shadow-md inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none w-full text-sm mt-[1rem]"
                >
                    <div className="absolute left-10">
                        <GitHubLogoIcon />
                    </div>
                    Continue with Github
                </button>
                <Dialog.Close asChild>
                    <button
                        className="text-black hover:bg-gray-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default RegisterModal;