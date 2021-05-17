import React from "react";
import { DatePicker, TimePicker } from "material-ui-pickers";
import { Moment, monthsShort } from "moment";
import Modal from ".";
import Chip from "../chip";
import { TextFieldProps } from "@material-ui/core";
import { DAYS_SHORT } from "../../utils";

interface TaskModalProps {
  date: Moment | null;
  modalTitle: string;
  time: Moment | null;
  isOpen: boolean;
  title: string | null;
  save: () => Promise<void>;
  closeModal: () => void;
  setDate: React.Dispatch<React.SetStateAction<Moment | null>>;
  setTime: React.Dispatch<React.SetStateAction<Moment | null>>;
  setTitle:
    | React.Dispatch<React.SetStateAction<string | null>>
    | React.Dispatch<React.SetStateAction<string>>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  date,
  modalTitle,
  time,
  isOpen,
  title,
  closeModal,
  save,
  setDate,
  setTime,
  setTitle,
}) => {
  return (
    <div>
      <Modal
        closeModal={closeModal}
        onSave={async () => {
          const text = title;
          await save();
          if (text) {
            closeModal();
          }
        }}
        isOpen={isOpen}
        title={modalTitle}
      >
        <input
          autoFocus
          value={title ?? ""}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Write your task here..."
          className="w-full px-2 py-1 my-4 border-b-2 transition duration-300 hover:border-b hover:border-gray-600 focus:border-b focus:border-gray-700 focus:outline-none"
        />
        <div className="mt-4">Would you like to set a dealine?</div>
        <div className="flex">
          <DatePicker
            color="primary"
            showTodayButton
            value={date}
            onChange={setDate}
            TextFieldComponent={(props: TextFieldProps) => (
              <Chip
                label="date"
                onClick={props.onClick}
                iconSrc={`/icons/Schedule${date ? "_hover" : "_inactive"}.svg`}
                onCancel={() => setDate(null)}
                value={
                  date
                    ? `${DAYS_SHORT[date.day()]}, ${date.date()} ${monthsShort(
                        date.month()
                      )}
                      ${date.year()}
                      `
                    : null
                }
              />
            )}
          />
          <TimePicker
            value={time}
            minutesStep={5}
            showTodayButton
            todayLabel="now"
            onChange={setTime}
            TextFieldComponent={(props: TextFieldProps) => (
              <Chip
                label="time"
                onClick={props.onClick}
                iconSrc={`/icons/clock${time ? "_hover" : "_inactive"}.svg`}
                onCancel={() => setTime(null)}
                value={time ? time.format("hh:mm a") : null}
              />
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
