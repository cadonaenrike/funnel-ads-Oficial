/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaWhatsapp, FaCircleXmark } from "react-icons/fa6";
import z_api from "@/services/Z-APi";

interface WhatsappConnectProps {
  open: boolean;
  onClose: (success?: boolean) => void;
}

export default function WhatsappConnect({
  open,
  onClose,
}: WhatsappConnectProps) {
  const cancelButtonRef = useRef(null);
  const [qrcode, setQrcode] = useState("");

  const getQrCode = async () => {
    const result = await z_api.get("/qr-code/image");
    setQrcode(result.data.value);
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const verifyConnect = async () => {
    const result = await z_api.get("/status");
    if (result.data.connected) {
      clearInterval(intervalRef.current!);
      onClose(true);
    }
  };

  useEffect(() => {
    if (open) {
      getQrCode();
      intervalRef.current = setInterval(verifyConnect, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white">
                  <div className="-ml-4 pt-3">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="font-semibold leading-6 justify-between flex text-gray-900 border-b w-full pb-5 pt-3 pl-5"
                      >
                        Conectar Whatsapp
                        <button className="mr-4" onClick={() => onClose()}>
                          <FaCircleXmark className="text-neutral-600 hover:text-sky-600" />
                        </button>
                      </Dialog.Title>
                      <div className="mt-2 w-full flex flex-col py-7 p-4 border-b">
                        <div className="w-full flex justify-center">
                          {!qrcode ? (
                            <span className="loader"></span>
                          ) : (
                            <p>
                              Por favor, leia o QrCode com o Whatsapp para
                              continuar.
                            </p>
                          )}
                        </div>
                        <div className="mt-5 flex justify-center">
                          {qrcode && <img className="w-[50%]" src={qrcode} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Fechar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
