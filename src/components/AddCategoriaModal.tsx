import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaCircleXmark, FaFloppyDisk } from "react-icons/fa6";

interface DialogModal {
  isOpen: boolean;
  isClose: () => void;
  onOk: (name: string) => void;
}

export default function AddCategoriaModal({
  isOpen,
  isClose,
  onOk,
}: DialogModal) {
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 max-w-6xl"
        initialFocus={cancelButtonRef}
        onClose={isClose}
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                        Adicionar Categoria
                        <button className="mr-4" onClick={() => isClose()}>
                          <FaCircleXmark className="text-neutral-600 hover:text-sky-600" />
                        </button>
                      </Dialog.Title>
                      <div className="mt-2 w-full flex flex-col py-7 pl-4 border-b">
                        <label
                          htmlFor="nomeCategoria"
                          className="text-neutral-600"
                        >
                          Nome da categoria:
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          name="nomeCategoria"
                          className="border selection:border-cyan-300 h-10 w-11/12 focus:outline-cyan-200 rounded-lg px-2 mb-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full items-center gap-2 justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      isClose(), onOk(name), setName("");
                    }}
                  >
                    <FaFloppyDisk />
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => isClose()}
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
