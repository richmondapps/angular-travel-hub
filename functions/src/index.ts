import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ origin: true }));

admin.initializeApp(functions.config().firebase);
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secrets = new SecretManagerServiceClient();
const sgMail = require('@sendgrid/mail');

async function getSecretValue(name: string) {
    const [version] = await secrets.accessSecretVersion({
      name: `projects/312190712912/secrets/${name}/versions/latest`,
    });
    const payload = version.payload?.data?.toString();
    return payload;
  }
//   const twilio = require('twilio');
  const db = admin.firestore();

  export class AutoId {
    static newId(): string {
      // Alphanumeric characters
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let autoId = '';
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // assert(autoId.length === 20, 'Invalid auto ID: ' + autoId);
      return autoId;
    }
  }

  exports.initialTravelRequest = functions.https
  .onCall(async (data: any) => {
    const secretName = data.sendGridSecretName;
    const sendGridSecret = await getSecretValue(secretName);
    sgMail.setApiKey(sendGridSecret);
    const templateId = data.sendGridTemplateName;
    const TEMPLATE_ID = await getSecretValue(templateId);
    const emailHTMLObj = data.emailHTMLObj;
    const subjectLine = data.subjectLine;
    const emailRecipientPath = data.emailRecipientPath;

    console.log('Travel Request Data', data);
    console.log('EmailHTMLObj', emailHTMLObj);
    console.log('Email Recipient Path', emailRecipientPath);

    return db
      .collection(emailRecipientPath)
      .get()
      .then((user) => {
        const emailRecipients: any[] = [];     
        user.forEach((doc) => {
          console.log('ForEach Doc', doc.data());
          const x = doc.data();
          console.log('Email', x.personEmail);         
          emailRecipients.push(x.personEmail);
        });

        console.log('Email Recipients', emailRecipients);
        const msg = {
          to: emailRecipients,
          from: 'no-reply@ra-travel.com',
          subject: `${subjectLine}`,
          // custom templates
          templateId: TEMPLATE_ID,
          substitutionWrappers: ['{{', '}}'],
          dynamic_template_data: {
              cssStyles: data.cssStyles,
            personLegalNameFirst: data.personLegalNameFirst,           
            emailHTMLObj: `${emailHTMLObj}`,
            travelRequestUrl: data.travelRequestUrl
          },
        };
        console.log('MSG OBJECT', msg);
        return sgMail.sendMultiple(msg);
      })
      .then(() => {
        console.log('Travel Request Email Sent.');
        return {status: 200, msg: 'Email sent'}  
    })
      .catch((err) => console.log(err));
  }
);


