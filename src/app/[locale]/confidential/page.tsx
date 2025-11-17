"use client";

import Footer from "@/layouts/Footer";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";

const Confidential = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-4 pb-[80px] md:pb-[20px] container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="px-6 sm:px-8 pt-[18px] pb-[20px] rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-[#1C1C1C] font-medium text-[16px] sm:text-xl lg:text-2xl mb-4 text-center max-w-[600px]">
              Политика конфиденциальности
            </h2>
            <p className="text-[#595959] text-sm sm:text-base font-normal mb-4 text-center max-w-[700px]">
              Компания ТОО &quot;Funsim international&quot; (далее — Funsim)
              придерживается принципов конфиденциальности и обязуется защищать
              личную информацию клиентов. Настоящая политика конфиденциальности
              объясняет, как мы собираем, используем, передаем и храним
              информацию о наших клиентах.
            </p>
          </div>

          <div className="space-y-6">
            {/* Сбор информации */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                1. Сбор информации
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal mb-2">
                Мы собираем личную информацию о клиентах, включая, но не
                ограничиваясь, следующими данными:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#595959] text-sm sm:text-base font-normal">
                <li>Имя и фамилия.</li>
                <li>Контактная информация (адрес электронной почты, номер телефона).</li>
                <li>
                  Данные о местоположении, необходимые для предоставления
                  роуминговых услуг.
                </li>
                <li>
                  Информация о платежных картах или других способах оплаты.
                </li>
              </ul>
            </section>

            {/* Использование информации */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                2. Использование информации
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal mb-2">
                Мы используем собранную информацию для следующих целей:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#595959] text-sm sm:text-base font-normal">
                <li>
                  Предоставление роуминговых услуг и обслуживание клиентов.
                </li>
                <li>Обработка платежей и выставление счетов.</li>
                <li>Разрешение споров и урегулирование претензий.</li>
                <li>
                  Оповещение клиентов о новых услугах и акциях (по согласию
                  клиента).
                </li>
              </ul>
            </section>

            {/* Защита информации */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                3. Защита информации
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal">
                Мы принимаем меры безопасности для защиты информации клиентов от
                несанкционированного доступа, утраты, разглашения или изменения.
                Мы осуществляем регулярный мониторинг систем безопасности и
                обучение наших сотрудников в области конфиденциальности.
              </p>
            </section>

            {/* Разглашение информации */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                4. Разглашение информации
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal">
                Мы не продаем, не арендуем и не передаем личную информацию
                клиентов третьим сторонам без их явного согласия, за исключением
                случаев, предусмотренных законодательством.
              </p>
            </section>

            {/* Изменения в политике конфиденциальности */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                5. Изменения в политике конфиденциальности
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal">
                Мы оставляем за собой право вносить изменения в настоящую
                политику конфиденциальности. Обновленная редакция политики будет
                опубликована на нашем сайте и вступает в силу с момента
                размещения, если иное не указано в новой редакции.
              </p>
            </section>

            {/* Контакты */}
            <section>
              <h3 className="text-[#1C1C1C] font-medium text-base sm:text-lg mb-2">
                6. Контакты
              </h3>
              <p className="text-[#595959] text-sm sm:text-base font-normal mb-2">
                Если у вас есть какие-либо вопросы или предложения по поводу
                нашей политики конфиденциальности, пожалуйста, свяжитесь с нами
                по следующим контактам:
              </p>
              <p className="text-[#595959] text-sm sm:text-base font-normal">
                Адрес электронной почты:{" "}
                <a
                  href="mailto:info@funsim.kz"
                  className="text-[#FFB800] underline"
                >
                  info@funsim.kz
                </a>
                <br />
                Телефон:{" "}
                <a href="tel:+77007760707" className="text-[#FFB800] underline">
                  +7 (700) 776 07 07
                </a>
              </p>
            </section>

            {/* Закон РК о персональных данных */}
            <section>
              <p className="text-[#595959] text-sm sm:text-base font-normal">
                Законодательство в области защиты персональных данных регулируется{" "}
                <a
                  href="https://online.zakon.kz/Document/?doc_id=31396226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#FFB800]"
                >
                  Законом Республики Казахстан. О персональных данных и их защите.
                </a>
              </p>
            </section>

            <p className="text-[#595959] text-sm sm:text-base font-normal mt-4">
              Спасибо за выбор наших услуг. Мы ценим ваше доверие и стремимся
              предоставить вам лучший опыт в использовании роуминговых SIM-карт.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
        <FooterNav />
      </div>
    </div>
  );
};

export default Confidential;
