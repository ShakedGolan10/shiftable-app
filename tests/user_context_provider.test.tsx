import '@testing-library/jest-dom'
import { userService } from "@/services/user.service";
import { useRouter } from 'next/navigation';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useAuth, UserProvider } from '@/providers/UserContextProvider';

jest.mock('@/services/user.service');
jest.mock('next/navigation', ()=> ({useRouter: jest.fn()}))

describe('Testing the User context provider', () => {
    const mockPush = jest.fn();

    beforeEach(()=> {
        (useRouter as jest.Mock).mockReturnValue({push: mockPush})
    })

    const TestComponent = () => {
        const { user } = useAuth<{ username: 'testUser' }>();
        return <div>{user ? `Username: ${user.username}` : 'No User'}</div>;
    };

    test('should fetch user on mount and set loading state', async () => {
        // expect.assertions(2)
        const mockUser = { username: 'testUser' };
        (userService.getLoggedInUser as jest.Mock).mockResolvedValueOnce(mockUser);
        // fetchService.POST = jest.fn().mockResolvedValue('s');
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        )

        expect(userService.getLoggedInUser).toHaveBeenCalled()
        expect(screen.getByText('Loading user...')).toBeInTheDocument()

        await waitFor(()=> {
            expect(screen.getByText('Username: testUser')).toBeInTheDocument();
        })
        expect(screen.queryByText('Loading user...')).not.toBeInTheDocument()
    })
})