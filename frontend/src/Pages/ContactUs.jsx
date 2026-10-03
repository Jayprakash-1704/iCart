
import  { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">

          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-200">
            Get In Touch
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Have a question, feedback, or need help with your order?
            Our team is here to help you.
          </p>

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-3">

            {/* ================= LEFT INFO ================= */}
            <div className="space-y-5">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Let's Talk
                </h2>

                <p className="mt-2 leading-6 text-gray-500">
                  We're always happy to hear from you. Reach out to us
                  using any of the contact options below.
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Mail size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Email Us
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    support@example.com
                  </p>

                  <p className="text-sm text-gray-500">
                    sales@example.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Phone size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Call Us
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    +91 98765 43210
                  </p>

                  <p className="text-sm text-gray-500">
                    +91 91234 56789
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <MapPin size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Visit Us
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    123 Market Street,
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Clock size={21} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Working Hours
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Monday – Saturday
                  </p>

                  <p className="text-sm text-gray-500">
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* ================= FORM ================= */}
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form below and we'll get back to you
                  as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                </div>

                {/* Phone + Subject */}
                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                </div>

                {/* Message */}
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  <Send size={18} />
                  Send Message
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SUPPORT BANNER ================= */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-2xl bg-gray-900 px-6 py-8 text-center text-white sm:flex-row sm:px-10 sm:text-left">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600">
              <MessageCircle size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Need immediate help?
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Our customer support team is ready to assist you.
              </p>
            </div>
          </div>

          <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100">
            Start Chat
          </button>

        </div>
      </section>

    </div>
  );
};

export default Contact;

