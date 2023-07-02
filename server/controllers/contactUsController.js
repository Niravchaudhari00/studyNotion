import contactForm from "../mail/template/contactForm.js";
import mailSender from "../utils/mailSend.js";

export const sendMessage = async (req, res) => {
     try {

          const { firstName, lastName, email, countryCode, mobileNo, message } =
               req.body;

          const mailist = [
               email,
               'nir7308@gmail.com'
          ]
          mailist.forEach((email) => {
               mailSender(email,
                    "Your data send successfully",
                    contactForm(email, firstName, lastName, countryCode, mobileNo, message))
          })


          res.json({
               success: true,
               message: 'Email send successfully.',
          })
     } catch (error) {
          res.json({
               success: false,
               message: 'Email send failed.',
               error: error.message
          })
     }
};
