import '@testing-library/jest-dom'
import { userService } from "@/services/user.service";
import { useRouter } from 'next/navigation';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useAuth, UserProvider } from '@/providers/UserContextProvider';

jest.mock('@/services/user.service');
jest.mock('next/navigation', ()=> ({useRouter: jest.fn()}))

describe('Testing the User context provider', () => {

    beforeEach(()=> {
        (useRouter as jest.Mock).mockReturnValue({push: jest.fn()})
    })
    
    const TestComponent = () => {
        const { user } = useAuth<{ username: 'testUser' }>();
        return <div>{user ? `Username: ${user.username}` : 'No User'}</div>;
    };
    const mockUser = { username: 'testUser' };
    
    test('should fetch user on mount and set loading state', async () => {
        // expect.assertions(2)
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

    test('should redirect to / if isnt loggedIn', async () => {
        (userService.getLoggedInUser as jest.Mock).mockRejectedValueOnce(new Error('USER_SERVICE: unabled to verify if user logged in'));


        // await act(async () => {
            render(
              <UserProvider>
                <TestComponent />
              </UserProvider>
            );
        //   });
      
          expect(userService.getLoggedInUser).toHaveBeenCalled();
          
          await waitFor(() => {
            expect(useRouter().push).toHaveBeenLastCalledWith('/');
          });
        });
    
        test('should redirect to /main if loggedIn and on /', async () => {
            (userService.getLoggedInUser as jest.Mock).mockResolvedValueOnce(mockUser);


        // await act(async () => {
            render(
              <UserProvider>
                <TestComponent />
              </UserProvider>
            );
        //   });
      
          expect(userService.getLoggedInUser).toHaveBeenCalled();
          
          await waitFor(() => {
            expect(useRouter().push).toHaveBeenLastCalledWith('/');
          });
        });
})