import { render, fireEvent } from "@testing-library/react";
import Notification from "../Notification";
import useNotificationStore, {
  INotification,
} from "@/stores/useNotificationStore";

jest.mock("@/stores/useNotificationStore");

const mockDismissNotification = jest.fn();

(
  useNotificationStore as jest.MockedFunction<typeof useNotificationStore>
).mockReturnValue({
  notification: null,
  dismissNotification: mockDismissNotification,
});

describe("Notification", () => {
  it("should display a notification and dismiss it when the button is clicked", () => {
    const notification: INotification = {
      isError: false,
      message: "Test notification",
    };

    (
      useNotificationStore as jest.MockedFunction<typeof useNotificationStore>
    ).mockReturnValue({
      notification,
      dismissNotification: mockDismissNotification,
    });

    const { getByText, queryByText, rerender } = render(<Notification />);

    expect(getByText(notification.message!)).toBeInTheDocument();

    fireEvent.click(getByText("x"));

    expect(mockDismissNotification).toHaveBeenCalled();

    (
      useNotificationStore as jest.MockedFunction<typeof useNotificationStore>
    ).mockReturnValue({
      notification: null,
      dismissNotification: mockDismissNotification,
    });

    rerender(<Notification />);

    expect(queryByText(notification.message!)).not.toBeInTheDocument();
  });

  it("should display a green notification when isError is false", () => {
    const notification: INotification = {
      isError: false,
      message: "Test notification",
    };

    (
      useNotificationStore as jest.MockedFunction<typeof useNotificationStore>
    ).mockReturnValue({
      notification,
      dismissNotification: mockDismissNotification,
    });

    const { container } = render(<Notification />);

    expect(container.firstChild).toHaveClass("bg-green-400");
  });

  it("should display a red notification when isError is true", () => {
    const notification: INotification = {
      isError: true,
      message: "Test notification",
    };

    (
      useNotificationStore as jest.MockedFunction<typeof useNotificationStore>
    ).mockReturnValue({
      notification,
      dismissNotification: mockDismissNotification,
    });

    const { container } = render(<Notification />);

    expect(container.firstChild).toHaveClass("bg-red-400");
  });
});
