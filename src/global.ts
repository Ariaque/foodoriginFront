
// To use this variables in an other file:
// import * as myGlobals from 'globals';

'use strict';

//Regex
export const regex_phone_number = '(0)[1-9][0-9]{8}';
export const regex_white_space = '^(?!\\s*$).+';
export const regex_email = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
export const regex_website = '(https?:\\/\\/)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)';
export const regex_siret = '^[0-9]{14}$';


//Strings
export const contact_title = 'Envoi réussi !';
export const contact_text = 'Votre message a bien été pris en compte, nous reviendrons vers vous dès que possible !';
export const no_matching_email = 'Cet email ne correspond à aucun utilisateur';
export const inactive_account_change_password = 'Votre compte est désactivé, vous ne pouvez pas changer votre mot de passe !';
export const inactive_account = 'Le compte n\'est pas activé !';
export const reset_password_title = 'Vérifiez vos mails !';
export const reset_password_text = 'Vérifiez vos mails (et vos spams !), un mail pour réinitialiser votre  mot de passe vous a été envoyé !';
export const info_saved = 'Informations sauvegardées !';
export const error_while_saving_info = 'Une erreur s\'est produite lors de l\'enregistrement des informations saisies !';
export const incorrect_img_format = 'Image(s) transmise(s) à un format incorrect';
export const error_while_saving_img = 'Une erreur s\'est produite lors de l\'enregistrement, la taille de l\'image ne doit pas dépasser 500KB !';
export const soon_title = 'Bientôt disponible !';
export const soon_text = 'FoodOrigin se prépare à son lancement vers la planète Androïd, restez à l\'affut !';
export const account_created = 'Compte crée ! L\'administrateur vous recontactera !';
export const mail_to_admin_obj = '[FoodOrigin-Demande d\'activation] Nouvelle inscription';
export const mail_to_admin_text = 'Un nouvel utilisateur a créé un compte !' +  '\r\n'
  + '1/ Vérifiez qu\'il s\'est acquité de son paiement.' + '\r\n'
  + '2/ Connectez-vous à la plateforme FoodOrigin avec votre compte administrateur' + '\r\n'
  + '3/ Cliquez sur "Gestion des comptes" dans la barre de menu' + '\r\n'
  + '4/ Dans l\'interface de gestion des comptes, recherchez l\'utilisateur et cliquez sur "Activer"';
export const bad_login = 'Nom d\'utilisateur ou mot de passe incorrect !';
export const new_pass_changed = 'Nouveau mot de passe enregistré !';
export const bad_old_password = 'L\'ancien mot de passe n\'est pas correct !';
export const new_pass_is_old_pass = 'Le nouveau et l\'ancien mot de passe sont identiques !';
export const reset_password_confirmed_title = 'Nouveau mot de passe enregistré !';
export const reset_password_confirmed_text = 'Votre nouveau mot de passe a bien été sauvegardé, vous pouvez dès à présent vous connecter !';
export const delete_account_confirmation = 'Voulez-vous vraiment supprimer l\'utilisateur: ';
export const problem_mail = 'Un probème s\'est produit lors de l\'envoi du mail';
export const group_success = 'Nouveau groupe enregistré avec succès'
