"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./GiftRegistry.module.css";
import { Heart, Banknote, Smartphone, QrCode, Copy } from "lucide-react";

interface BankDetails {
  bank: string;
  accountName: string;
  accountNumber: string;
  branch: string;
}

interface MobilePaymentDetails {
  phoneNumber: string;
  name: string;
}

interface QRCodeDetails {
  image: string;
}

interface BankPaymentMethod {
  id: "bank";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: BankDetails;
}

interface MobilePaymentMethod {
  id: "momo" | "zalopay";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: MobilePaymentDetails;
}

interface QRCodePaymentMethod {
  id: "qrcode";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: QRCodeDetails;
}

type PaymentMethod =
  | BankPaymentMethod
  | MobilePaymentMethod
  | QRCodePaymentMethod;

const paymentMethods: PaymentMethod[] = [
  {
    id: "bank",
    icon: Banknote,
    title: "Chuyển Khoản Ngân Hàng",
    description: "Chuyển tiền trực tiếp qua tài khoản ngân hàng",
    details: {
      bank: "Ngân hàng Vietcombank",
      accountName: "Trần A & Trần B",
      accountNumber: "1234567890",
      branch: "Chi nhánh TP. Hồ Chí Minh",
    },
  },
  {
    id: "momo",
    icon: Smartphone,
    title: "MoMo",
    description: "Gửi tiền mừng qua ứng dụng MoMo",
    details: {
      phoneNumber: "0912345678",
      name: "Trần A",
    },
  },
  {
    id: "zalopay",
    icon: Smartphone,
    title: "ZaloPay",
    description: "Gửi tiền mừng qua ứng dụng ZaloPay",
    details: {
      phoneNumber: "0912345678",
      name: "Trần A",
    },
  },
  {
    id: "qrcode",
    icon: QrCode,
    title: "Quét QR Code",
    description: "Quét mã QR để chuyển tiền nhanh chóng",
    details: {
      image: "/images/qr-code-placeholder.png",
    },
  },
];

function PaymentCard({
  method,
  isVisible,
  index,
}: {
  method: PaymentMethod;
  isVisible: boolean;
  index: number;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const IconComponent = method.icon;

  return (
    <motion.div
      className={`${styles.paymentCard} glass-card-strong`}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 1.2,
        delay: 0.2 + index * 0.15,
        ease: EASE_CINEMATIC,
      }}
    >
      <div className={styles.iconWrapper}>
        <IconComponent />
      </div>
      <h3 className={styles.methodTitle}>{method.title}</h3>
      <p className={styles.methodDescription}>{method.description}</p>

      <div className={styles.details}>
        {method.id === "bank" && (
          <>
            <div className={styles.detailRow}>
              <span className={styles.label}>Ngân hàng:</span>
              <span className={styles.value}>{method.details.bank}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Tên tài khoản:</span>
              <span className={styles.value}>{method.details.accountName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Số tài khoản:</span>
              <div className={styles.copyableValue}>
                <span>{method.details.accountNumber}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(method.details.accountNumber as string)
                  }
                  className={styles.copyButton}
                  title="Sao chép"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Chi nhánh:</span>
              <span className={styles.value}>{method.details.branch}</span>
            </div>
          </>
        )}

        {(method.id === "momo" || method.id === "zalopay") && (
          <>
            <div className={styles.detailRow}>
              <span className={styles.label}>Số điện thoại:</span>
              <div className={styles.copyableValue}>
                <span>{method.details.phoneNumber}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(method.details.phoneNumber as string)
                  }
                  className={styles.copyButton}
                  title="Sao chép"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Tên:</span>
              <span className={styles.value}>{method.details.name}</span>
            </div>
          </>
        )}

        {method.id === "qrcode" && (
          <div className={styles.qrCodePlaceholder}>
            <QrCode size={80} />
            <p>Mã QR sẽ được hiển thị ở đây</p>
          </div>
        )}
      </div>

      {copied && (
        <motion.div
          className={styles.copiedNotice}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          ✓ Đã sao chép
        </motion.div>
      )}
    </motion.div>
  );
}

export default function GiftRegistry() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="gift" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <div className={styles.heartIcon}>
          <Heart size={32} />
        </div>
        <p className="section-subheading">Gửi Tiền Mừng</p>
        <h2 className="section-heading">Lời Chúc Yêu Thương</h2>
        <div className="gold-divider" />
        <p className={styles.headerDescription}>
          Nếu bạn không thể tham dự buổi lễ, chúng tôi vẫn luôn trân trọng sự
          quan tâm và lời chúc của bạn. Trong trường hợp bạn muốn gửi tặng một
          món quà nhỏ, bạn có thể tham khảo các hình thức bên dưới. Dù bằng cách
          nào, tình cảm của bạn cũng là điều ý nghĩa nhất đối với chúng tôi.
        </p>
      </motion.div>

      <div className={styles.paymentsGrid}>
        {paymentMethods.map((method, i) => (
          <PaymentCard
            key={method.id}
            method={method}
            isVisible={isVisible}
            index={i}
          />
        ))}
      </div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6, ease: EASE_CINEMATIC }}
      >
        <p className={styles.thankYou}>
          Xin cảm ơn tình cảm và sự ủng hộ của bạn. <br />
          Những lời chúc của bạn sẽ mãi nằm trong tim chúng tôi.
        </p>
      </motion.div>
    </section>
  );
}
