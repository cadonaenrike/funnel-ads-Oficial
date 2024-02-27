import React, { useEffect, useState } from "react";

import { updateDfatores } from "@/services/dFatoresService";
import { FaShieldHalved } from "react-icons/fa6";
import { GetUserById } from "@/services/GetUserService";

const TwoFactorAuthenticationCard = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserById();
      if (userData) {
        setIs2FAEnabled(userData.dfatores!);
      }
    };

    fetchUserData();
  }, []);

  const toggle2FA = async () => {
    const success = await updateDfatores(!is2FAEnabled);
    if (success) {
      setIs2FAEnabled(!is2FAEnabled); // Atualiza o estado com o novo status de 2FA
      alert(
        is2FAEnabled
          ? "Autenticação em 2 fatores desabilitado com sucesso!"
          : "Autenticação em 2 fatores habilitado com sucesso!"
      );
    } else {
      alert("Falha ao alterar o status do 2FA.");
    }
  };

  return (
    <section className="flex w-full h-auto p-8">
      <section className="border-2 border-dotted px-6 py-7 bg-sky-50 border-sky-600 flex items-center gap-3 rounded-lg">
        <FaShieldHalved size={40} className="text-primary" />
        <section className="px-3 py-2">
          <h3 className="text-lg text-zinc-700">Proteja sua Conta</h3>
          <p className="text-sm text-neutral-600">
            A autenticação de dois fatores adiciona uma camada extra de
            segurança à sua conta. Para fazer login, você também precisará
            fornecer um código de seis dígitos.
          </p>
        </section>
        <button
          onClick={toggle2FA}
          className="py-3 w-3/12 font-semibold text-white rounded-lg bg-slate-800 hover:bg-sky-800"
        >
          {is2FAEnabled ? "Desabilitar 2 Fatores" : "Habilitar 2 Fatores"}
        </button>
      </section>
    </section>
  );
};

export default TwoFactorAuthenticationCard;
