import html2canvas from "html2canvas";
import { jsonrepair } from "jsonrepair";
export const validateEmail = (email) => {
  if (!email.trim()) return "Vui lòng nhập email.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Địa chỉ email không hợp lệ.";
  return "";
};
export const validatePassword = (password) => {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  // if (!/[A-Z]/.test(password))
  //   return "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.";
  // if (!/[a-z]/.test(password))
  //   return "Mật khẩu phải chứa ít nhất một chữ cái viết thường.";
  // if (!/[0-9]/.test(password)) return "Mật khẩu phải chứa ít nhất một chữ số.";
  return "";
};
export const validateAvatar = (file) => {
  if (!file) return "";
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type))
    return "Chỉ chấp nhận các định dạng ảnh: .jpg, .jpeg, .png.";
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) return "Kích thước ảnh không được vượt quá 5MB.";
  return "";
};
export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl || typeof imageUrl !== "string") {
      return reject(new Error("URL ảnh không hợp lệ"));
    }
    const img = new Image();
    if (!imageUrl.startsWith("data")) {
      img.crossOrigin = "anonymous";
    }
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightneess = (red + green + blue) / 3;
        if (brightneess > 100) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }
      if (count === 0) {
        return resolve("#ffffff");
      }
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      const lightColor = `rgb(${r}, ${g}, ${b})`;
      resolve(lightColor);
    };
    img.onerror = (e) => {
      console.error("Lỗi tải ảnh từ URL:", e);
      reject(new Error("Không thể tải ảnh từ URL đã cho"));
    };
  });
};
export const fixTailwindColors = (element) => {
  const elements = element.querySelectorAll("*");
  elements.forEach((el) => {
    const style = window.getComputedStyle(el);
    ["backgroundColor", "color", "borderColor"].forEach((prop) => {
      const value = style[prop];
      if (value.includes("oklch")) el.style[prop] = "#000";
    });
  });
};
export const captureElementAsImage = async (element) => {
  if (!element) {
    console.error("captureElementAsImage: element is null or undefined");
    return null;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        const images = clonedDoc.querySelectorAll("img");
        images.forEach((img) => {
          if (img.src) {
            img.crossOrigin = "anonymous";
          }
        });
      },
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing element as image:", error);
    return null;
  }
};
export const dataUrltoFile = (dataUrl, filename) => {
  if (!dataUrl || typeof dataUrl !== "string") {
    console.error("dataUrltoFile: invalid dataUrl");
    return null;
  }

  try {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error converting dataUrl to File:", error);
    return null;
  }
};
export const questionAnswerPrompt = (
  role = "Vị trí chưa xác định",
  experience = 0,
  topicsToFocus = "Không có chủ đề trọng tâm",
  numberOfQuestions = 5
) => `
  Bạn là AI chuyên tạo bộ câu hỏi phỏng vấn và câu trả lời.
  Yêu cầu đầu ra:
  - Ngôn ngữ: tiếng Việt.
  - Trả về JSON THUẦN dạng mảng, mỗi phần tử gồm "question" và "answer".
  - Tuyệt đối KHÔNG thêm văn bản, lời mở đầu hay giải thích ngoài JSON.

  Thông tin đầu vào:
  - Vị trí: ${role}
  - Số năm kinh nghiệm ứng viên: ${experience}
  - Chủ đề cần tập trung: ${topicsToFocus}
  - Số câu hỏi: ${numberOfQuestions}

  Hướng dẫn chi tiết:
  - Mỗi câu trả lời cần dễ hiểu với người mới.
  - Nếu cần code, chèn Markdown code block nhỏ.
  - Format sạch, rõ ràng, dễ đọc.
  - Đảm bảo JSON hợp lệ, không chứa ký tự điều khiển lạ.
`;

export const conceptExplainPrompt = (
  question = "Câu hỏi phỏng vấn chưa xác định"
) => `
  Bạn là AI giải thích kiến thức phỏng vấn cho người mới.
  Yêu cầu đầu ra:
  - Ngôn ngữ: tiếng Việt.
  - Trả về JSON THUẦN gồm:
    {
      "title": "Tiêu đề ngắn gọn",
      "explanation": "Giải thích chi tiết"
    }
  - Tuyệt đối KHÔNG thêm văn bản, lời mở đầu hay giải thích ngoài JSON.

  Nhiệm vụ:
  - Giải thích sâu, dễ hiểu về câu hỏi sau: ${question}
  - Có thể chèn code block Markdown nếu cần.
  - Format sạch, rõ ràng, dễ đọc.
  - Đảm bảo JSON hợp lệ, không chứa ký tự điều khiển lạ.
`;
export const parseJSONResponse = (responseText) => {
  try {
    const repaired = jsonrepair(responseText);
    let parsed = JSON.parse(repaired);
    if (!parsed?.title && !parsed?.explanation && !Array.isArray(parsed)) {
      throw new Error("Phản hồi AI không hợp lệ.");
    }
    const unescapeMarkdown = (str) => {
      if (typeof str !== "string") return str;
      return str.replace(/\\n/g, "\n");
    };
    if (Array.isArray(parsed)) {
      parsed = parsed.map((item) => ({
        ...item,
        answer: unescapeMarkdown(item.answer),
      }));
    } else if (parsed.explanation) {
      parsed.explanation = unescapeMarkdown(parsed.explanation);
    }
    return parsed;
  } catch (error) {
    throw new Error(`Không thể đọc phản hồi từ AI. Chi tiết: ${error.message}`);
  }
};
